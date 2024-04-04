


namespace API.Entities
{
    public class UserLike
    {
        public AppUser SourcesUser { get; set; }
        public int SourcesUserId { get; set; }
        public AppUser TargetUser { get; set; }
        public int TargetUserId { get; set; }


    }
}
