
using API.Extensions;
using API.Interface;
using Microsoft.AspNetCore.Mvc.Filters;


namespace API.Extensions
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var userId = resultContext.HttpContext.User.GetUserId();
            var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
            var user = await repo.GetUsersByIdAysnc(userId);
            user.LastActive = DateTime.UtcNow;
            await repo.SaveAllAysnc();
        }

    }
}