using System.ComponentModel.DataAnnotations;

namespace OTPApp.DTO.User.Registration
{
    public class UserRegistrationDTO
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
    }
}
