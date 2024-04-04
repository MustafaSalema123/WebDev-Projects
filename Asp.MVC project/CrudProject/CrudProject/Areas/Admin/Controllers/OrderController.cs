using Bulky.DataAccess.Repository;
using Bulky.DataAccess.Repository.IRepository;
using Bulky.Model;
using Bulky.Model.ViewModels;
using Bulky.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using System.Collections.Generic;
using System.Diagnostics;
using System.Security.Claims;

namespace CrudProject.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize]
    public class OrderController : Controller
    {
        private readonly IUnitofWork _unitofWork;
        [BindProperty]
        public OrderVM OrderVM { get; set; }

        public OrderController(IUnitofWork unitofwork) 
        {
           _unitofWork= unitofwork;
        }

        public IActionResult Index()
        {
         
            

            return View();
        }
        public IActionResult details(int orderId)
        {

            OrderVM = new()
            {
                OrderHeader = _unitofWork.OrderHeader.Get(u => u.Id==orderId , includeProperties: "ApplicationUser"),
                OrderDetails = _unitofWork.OrderDetail.GetAll(u => u.Id == orderId, includeProperties: "Product")
            };

            return View(OrderVM);
        }
        [HttpPost]
        [Authorize(Roles =staticDetails.Role_Admin+","+staticDetails.Role_User_Comp)]
        public IActionResult UpdateOrderDetails() 
        {
            var orderHeaderFromDb = _unitofWork.OrderHeader.Get(u => u.Id == OrderVM.OrderHeader.Id);
            orderHeaderFromDb.Name = OrderVM.OrderHeader.Name;
            orderHeaderFromDb.PhoneNumber = OrderVM.OrderHeader.PhoneNumber;
            orderHeaderFromDb.StreetAddress = OrderVM.OrderHeader.StreetAddress;
            orderHeaderFromDb.City = OrderVM.OrderHeader.City;
            orderHeaderFromDb.State = OrderVM.OrderHeader.State;
            orderHeaderFromDb.PostalCode = OrderVM.OrderHeader.PostalCode;
            if (!string.IsNullOrEmpty(OrderVM.OrderHeader.Carrier))
            {
                orderHeaderFromDb.Carrier = OrderVM.OrderHeader.Carrier;
            }
            if (!string.IsNullOrEmpty(OrderVM.OrderHeader.TrackingNumber))
            {
                orderHeaderFromDb.Carrier = OrderVM.OrderHeader.TrackingNumber;
            }
            _unitofWork.OrderHeader.Update(orderHeaderFromDb);
            _unitofWork.Save();

            TempData["Success"] = "Order Details Updated Successfully.";


            return RedirectToAction(nameof(details), new { orderId = orderHeaderFromDb.Id });
        }

        [HttpPost]
        [Authorize(Roles = staticDetails.Role_Admin + "," + staticDetails.Role_User_Comp)]
        public IActionResult StartProcessing() 
        {
            _unitofWork.OrderHeader.UpdateStatus(OrderVM.OrderHeader.Id, staticDetails.StatusInProcess);
            _unitofWork.Save();
            TempData["Sucess"] = "Order details Updated Successfully";

            return RedirectToAction(nameof(details), new { orderid = OrderVM.OrderHeader.Id});
        }

        

        [HttpPost]
        [Authorize(Roles = staticDetails.Role_Admin + "," + staticDetails.Role_User_Comp)]
        public IActionResult ShipOrder()
        {
            var orderHeader = _unitofWork.OrderHeader.Get(u => u.Id == OrderVM.OrderHeader.Id);
            orderHeader.TrackingNumber = OrderVM.OrderHeader.TrackingNumber;
            orderHeader.Carrier = OrderVM.OrderHeader.Carrier;
            orderHeader.OrderStatus = staticDetails.StatusShipped;
            orderHeader.ShippingDate = DateTime.Now;
            if (orderHeader.PaymentStatus == staticDetails.PaymentStatusDelayedPayment)
            {
                orderHeader.PaymentDueDate = DateTime.Now.AddDays(30);
            }

            _unitofWork.OrderHeader.Update(orderHeader);
            _unitofWork.Save();
            TempData["Success"] = "Order Shipped Successfully.";
            return RedirectToAction(nameof(details), new { orderId = OrderVM.OrderHeader.Id }); ;
        }
        [HttpPost]
        [Authorize(Roles = staticDetails.Role_Admin + "," + staticDetails.Role_Employee)]
        public IActionResult CancelOrder()
        {

            var orderHeader = _unitofWork.OrderHeader.Get(u => u.Id == OrderVM.OrderHeader.Id);

            if (orderHeader.PaymentStatus == staticDetails.PaymentStatusApproved)
            {
                var options = new RefundCreateOptions
                {
                    Reason = RefundReasons.RequestedByCustomer,
                    PaymentIntent = orderHeader.PaymentIntentId
                };

                var service = new RefundService();
                Refund refund = service.Create(options);

                _unitofWork.OrderHeader.UpdateStatus(orderHeader.Id, staticDetails.StatusCancelled, staticDetails.StatusRefunded);
            }
            else
            {
                _unitofWork.OrderHeader.UpdateStatus(orderHeader.Id, staticDetails.StatusCancelled, staticDetails.StatusCancelled);
            }
            _unitofWork.Save();
            TempData["Success"] = "Order Cancelled Successfully.";
            return RedirectToAction(nameof(details ), new { orderId = OrderVM.OrderHeader.Id });

        }

        [ActionName("details")]
        [HttpPost]
        public IActionResult Details_PAY_NOW()
        {
            OrderVM.OrderHeader = _unitofWork.OrderHeader.Get(u => u.Id==OrderVM.OrderHeader.Id , includeProperties:"ApplicationUser");

            OrderVM.OrderDetails = _unitofWork.OrderDetail.GetAll(u => u.OrderHeaderId == OrderVM.OrderHeader.Id, includeProperties: "Product");

            //stripe logic 
            var domain = Request.Scheme + "://" + Request.Host.Value + "/";
            var options = new SessionCreateOptions
            {


                SuccessUrl = domain + $"admin/order/PaymentConfirmation?orderHeaderId={OrderVM.OrderHeader.Id}",
                CancelUrl = domain + $"admin/order/details?orderId={OrderVM.OrderHeader.Id}",
                LineItems = new List<SessionLineItemOptions>(),
                Mode = "payment",
            };
            foreach (var item in OrderVM.OrderDetails)
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
            _unitofWork.OrderHeader.UpdateStripePaymentID(OrderVM.OrderHeader.Id, session.Id, session.PaymentIntentId);
            _unitofWork.Save();
            Response.Headers.Add("Location", session.Url);

            return new StatusCodeResult(303);
        }

        public IActionResult PaymentConfirmation(int orderHeaderId)
        {

            OrderHeader orderHeader = _unitofWork.OrderHeader.Get(u => u.Id == orderHeaderId);
            if (orderHeader.PaymentStatus == staticDetails.PaymentStatusDelayedPayment)
            {
                //this is an order by company

                var service = new SessionService();
                Session session = service.Get(orderHeader.SessionId);

                if (session.PaymentStatus.ToLower() == "paid")
                {
                    _unitofWork.OrderHeader.UpdateStripePaymentID(orderHeaderId, session.Id, session.PaymentIntentId);
                    _unitofWork.OrderHeader.UpdateStatus(orderHeaderId, orderHeader.OrderStatus, staticDetails.PaymentStatusApproved);
                    _unitofWork.Save();
                }


            }


            return View(orderHeaderId);
        }

        [HttpGet]
        public IActionResult GetAll(string status)
        {
            IEnumerable<OrderHeader> objOrderHeaders;


            if (User.IsInRole(staticDetails.Role_Admin) || User.IsInRole(staticDetails.Role_Employee))
            {
                objOrderHeaders = _unitofWork.OrderHeader.GetAll(includeProperties: "ApplicationUser").ToList();
            }
            else
            {

                var claimsIdentity = (ClaimsIdentity)User.Identity;
                var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;

                objOrderHeaders = _unitofWork.OrderHeader
                    .GetAll(u => u.ApplicationUserId == userId, includeProperties: "ApplicationUser");
            }


            switch (status)
            {
                case "pending":
                    objOrderHeaders = objOrderHeaders.Where(u => u.PaymentStatus == staticDetails.PaymentStatusDelayedPayment).ToList();
                    break;
                case "inprocess":
                    objOrderHeaders = objOrderHeaders.Where(u => u.OrderStatus == staticDetails.StatusInProcess).ToList();
                    break;
                case "completed":
                    objOrderHeaders = objOrderHeaders.Where(u => u.OrderStatus == staticDetails.StatusShipped ).ToList();
                    break;
                case "approved":
                    objOrderHeaders = objOrderHeaders.Where(u => u.PaymentStatus == staticDetails.StatusApproved ).ToList();
                    break;
                default:
                    
                    break;

            }

            return Json (new {data= objOrderHeaders });   
        }
    }
}
