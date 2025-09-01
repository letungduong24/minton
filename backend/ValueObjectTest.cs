using Minton.Core.Domain.Account.ValueObjects;
using Minton.Core.Domain.Shared;

// Test để minh họa Value-based Equality
public class ValueObjectTest
{
    public static void TestEmailEquality()
    {
        Console.WriteLine("=== Email Value Object Equality Test ===");
        
        // Test 1: Cùng giá trị, khác reference
        var email1 = Email.Create("john@example.com");
        var email2 = Email.Create("JOHN@EXAMPLE.COM");  // Normalized to lowercase
        
        Console.WriteLine($"Email1: {email1.Value}");
        Console.WriteLine($"Email2: {email2.Value}");
        Console.WriteLine($"Email1 == Email2: {email1 == email2}");  // True
        Console.WriteLine($"Email1.Equals(Email2): {email1.Equals(email2)}");  // True
        Console.WriteLine($"ReferenceEquals(Email1, Email2): {ReferenceEquals(email1, email2)}");  // False
        
        // Test 2: Khác giá trị
        var email3 = Email.Create("jane@example.com");
        Console.WriteLine($"Email1 == Email3: {email1 == email3}");  // False
        
        // Test 3: Hash Code consistency
        Console.WriteLine($"Email1 HashCode: {email1.GetHashCode()}");
        Console.WriteLine($"Email2 HashCode: {email2.GetHashCode()}");
        Console.WriteLine($"HashCode Equal: {email1.GetHashCode() == email2.GetHashCode()}");  // True
    }
    
    public static void TestMoneyEquality()
    {
        Console.WriteLine("\n=== Money Value Object Equality Test ===");
        
        // Test 1: Cùng Amount và Currency
        var money1 = Money.Create(100.50m, "USD");
        var money2 = Money.Create(100.50m, "USD");
        
        Console.WriteLine($"Money1: {money1}");
        Console.WriteLine($"Money2: {money2}");
        Console.WriteLine($"Money1 == Money2: {money1 == money2}");  // True
        
        // Test 2: Khác Currency
        var money3 = Money.Create(100.50m, "EUR");
        Console.WriteLine($"Money1 == Money3: {money1 == money3}");  // False
        
        // Test 3: Khác Amount
        var money4 = Money.Create(200.50m, "USD");
        Console.WriteLine($"Money1 == Money4: {money1 == money4}");  // False
    }
}

// Chạy test
// ValueObjectTest.TestEmailEquality();
// ValueObjectTest.TestMoneyEquality();
