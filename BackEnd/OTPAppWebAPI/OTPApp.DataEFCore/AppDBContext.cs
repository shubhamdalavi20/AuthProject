using Microsoft.EntityFrameworkCore;
using OTPApp.Entities.User;

namespace OTPApp.DataEFCore
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }
        public DbSet<UserEntity> Users => Set<UserEntity>();
    }
}
