﻿using Bulky.DataAccess.Repository;
using Bulky.DataAccess.Repository.IRepository;
using Bulky.Model;
using Bulky.Model.ViewModels;
using Bulky.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using System.Security.Claims;
using static System.Net.WebRequestMethods;

namespace CrudProject.Areas.Customer.Controllers
{

    [Area("Customer")]
    [Authorize]
    public class CartController : Controller
    {

        private readonly IUnitofWork _unitOfWork;
        //bind two time not write inside the summarypost method beacase its value is populated we dont create a new instance
        [BindProperty]
        public ShoppingCartVM ShoppingCartVM { get; set; }

        public CartController(IUnitofWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
          
        }
        public IActionResult Index()
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;

            ShoppingCartVM = new() { 
            shoppingCartsList =_unitOfWork.ShoppingCart.GetAll(u=>u.ApplicationUserId==userId,includeProperties:"Product"),
            OrderHeader = new()
            };

           foreach(var cart in ShoppingCartVM.shoppingCartsList) 
            {
             cart.Price = GetPriceBasedOnQuantity(cart);
                ShoppingCartVM.OrderHeader.OrderTotal += (cart.Price  * cart.Count);
            }

            return View(ShoppingCartVM);
        }
        public IActionResult plus(int cartId) 
        {
            var cartFromDb = _unitOfWork.ShoppingCart.Get(u=>u.Id==cartId);
            cartFromDb.Count += 1;
             

            _unitOfWork.Save();

            return RedirectToAction(nameof(Index));
        }
        public IActionResult minus(int cartId)
        {
            var cartFromDb = _unitOfWork.ShoppingCart.Get(u => u.Id == cartId);
            if(cartFromDb.Count <= 1) 
            {
                _unitOfWork.ShoppingCart.Remove (cartFromDb);
            }
            else 
            {
            cartFromDb.Count -= 1;
            _unitOfWork.ShoppingCart.Update(cartFromDb);

            }

            _unitOfWork.Save();

            return RedirectToAction(nameof(Index));
        
        }
        public IActionResult remove(int cartId)
        {
            var cartFromDb = _unitOfWork.ShoppingCart.Get(u => u.Id == cartId);
          
                _unitOfWork.ShoppingCart.Remove(cartFromDb);
            _unitOfWork.Save();
            return RedirectToAction(nameof(Index)); ;
        }

        public IActionResult Summary()
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;

            ShoppingCartVM = new()
            {
                shoppingCartsList = _unitOfWork.ShoppingCart.GetAll(u => u.ApplicationUserId == userId, includeProperties: "Product"),
                OrderHeader = new()
            };

            ShoppingCartVM.OrderHeader.ApplicationUser = _unitOfWork.ApplicationUser.Get(u => u.Id == userId);

            ShoppingCartVM.OrderHeader.Name = ShoppingCartVM.OrderHeader.ApplicationUser.Name;
            ShoppingCartVM.OrderHeader.PhoneNumber = ShoppingCartVM.OrderHeader.ApplicationUser.PhoneNumber;
            ShoppingCartVM.OrderHeader.StreetAddress = ShoppingCartVM.OrderHeader.ApplicationUser.StreetAddress;
            ShoppingCartVM.OrderHeader.City = ShoppingCartVM.OrderHeader.ApplicationUser.City;
            ShoppingCartVM.OrderHeader.State = ShoppingCartVM.OrderHeader.ApplicationUser.State;
            ShoppingCartVM.OrderHeader.PostalCode = ShoppingCartVM.OrderHeader.ApplicationUser.PostalCode;



            foreach (var cart in ShoppingCartVM.shoppingCartsList)
            {
                cart.Price = GetPriceBasedOnQuantity(cart);
                ShoppingCartVM.OrderHeader.OrderTotal += (cart.Price * cart.Count);
            }



            return View(ShoppingCartVM);      
        }

        [HttpPost]
        [ActionName("Summary")]
        public IActionResult SummaryPost()
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;

            ShoppingCartVM.shoppingCartsList = _unitOfWork.ShoppingCart.GetAll(u => u.ApplicationUserId == userId, includeProperties: "Product");


            ShoppingCartVM.OrderHeader.OrderDate= DateTime.Now;
            //add in forign key of ApplicationUserId
            ShoppingCartVM.OrderHeader.ApplicationUserId= userId;

            ApplicationUser applicationUser = _unitOfWork.ApplicationUser.Get(u => u.Id == userId);

            //erro occure a insert a new recxor
           // ShoppingCartVM.OrderHeader.ApplicationUser = _unitOfWork.ApplicationUser.Get(u => u.Id == userId);

            foreach (var cart in ShoppingCartVM.shoppingCartsList)
            {
                cart.Price = GetPriceBasedOnQuantity(cart);
                ShoppingCartVM.OrderHeader.OrderTotal += (cart.Price * cart.Count);
            }

            if(applicationUser.CompanyId.GetValueOrDefault() == 0) 
            {
                //it is a regular customer account and we need to captured payment
                ShoppingCartVM.OrderHeader.PaymentStatus = staticDetails.PaymentStatusPending;
                ShoppingCartVM.OrderHeader.OrderStatus = staticDetails.StatusPending;

            }
            else 
            {
                //its is a company user
                ShoppingCartVM.OrderHeader.PaymentStatus = staticDetails.PaymentStatusDelayedPayment;
                ShoppingCartVM.OrderHeader.OrderStatus = staticDetails.StatusApproved;
            }
            _unitOfWork.OrderHeader.Add(ShoppingCartVM.OrderHeader);
            _unitOfWork.Save();
            foreach (var cart in ShoppingCartVM.shoppingCartsList)
            {
                OrderDetail orderDetail = new()
                {
                    ProductId = cart.ProductId,
                    OrderHeaderId = ShoppingCartVM.OrderHeader.Id,
                    Price = cart.Price,
                    Count = cart.Count,


                };
                _unitOfWork.OrderDetail.Add(orderDetail);
                _unitOfWork.Save();

            }

            if (applicationUser.CompanyId.GetValueOrDefault() == 0)
            {
                //it is a regular customer account and we need to captured payment
                //stripe logic
                var Domain = "http://192.168.5.148:7296/";
                var options = new SessionCreateOptions
                {
                   

                    SuccessUrl = Domain + $"customer/cart/OrderConfirmation?id={ShoppingCartVM.OrderHeader.Id}" , 
                    CancelUrl = Domain + "customer/cart/index",
                    LineItems = new List<SessionLineItemOptions>(),
                    Mode = "payment",
                };
                foreach (var item in ShoppingCartVM.shoppingCartsList)
                {
                    
                    var sessionLineItem = new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = (long)(item.Price * 100), // $20.50 => 2050
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = item.Product.Title
                               
                            }
                        },
                        Quantity = item.Count
                    };
                    options.LineItems.Add(sessionLineItem);
                }

                var service = new SessionService();
                Session session = service.Create(options);
                _unitOfWork.OrderHeader.UpdateStripePaymentID(ShoppingCartVM.OrderHeader.Id, session.Id, session.PaymentIntentId);
                _unitOfWork.Save();
                Response.Headers.Add("Location", session.Url);
                return new StatusCodeResult(303);

            }

            return RedirectToAction(nameof(OrderConfirmation),new {id = ShoppingCartVM.OrderHeader.Id});

        }

        


        public IActionResult OrderConfirmation(int id) 
        {

            OrderHeader orderHeader = _unitOfWork.OrderHeader.Get(u => u.Id== id , includeProperties:"ApplicationUser");
            if(orderHeader.PaymentStatus != staticDetails.PaymentStatusDelayedPayment)
             {
                //this is an oreder by customer

                var service = new SessionService();
                Session session = service.Get(orderHeader.SessionId);
                if(session.PaymentStatus.ToLower() == "paid") {
                _unitOfWork.OrderHeader.UpdateStripePaymentID(id , session.Id, session.PaymentIntentId);
                    _unitOfWork.OrderHeader.UpdateStatus(id, staticDetails.StatusApproved , staticDetails.PaymentStatusApproved);
                    _unitOfWork.Save();

                }

            }

            List<ShoppingCart> shoppingCarts = _unitOfWork.ShoppingCart.GetAll(
                u => u.ApplicationUserId == orderHeader.ApplicationUserId).ToList();

            _unitOfWork.ShoppingCart.RemoveRange(shoppingCarts);
            _unitOfWork.Save();

            return View(id);
        }

        private double GetPriceBasedOnQuantity(ShoppingCart shoppingCart)
        {
            if (shoppingCart.Count <= 50)
            {
                return shoppingCart.Product.Price;
            }
            else
            {
                if (shoppingCart.Count <= 100)
                {
                    return shoppingCart.Product.Price50;
                }
                else
                {
                    return shoppingCart.Product.Price100;
                }
            }
        }


        }
}
