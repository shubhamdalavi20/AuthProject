using Common.Entities;

namespace OTPApp.Entities.User
{
    public class UserEntity : BaseEntity
    {
        public string UserName { get; set; } = string.Empty;
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public DateTime? VerifiedAt { get; set; }
    }
}
