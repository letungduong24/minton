namespace Minton.Core.Shared
{
    public abstract class BaseEntity
    {
        public int Id { get; protected set; }
        
        protected BaseEntity() { }
        
        protected BaseEntity(int id)
        {
            Id = id;
        }
    }
}
