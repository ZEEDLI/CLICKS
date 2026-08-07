// Put your Slick Pay API Key here
const API_KEY = '54|BZ7F6N4KwSD46GEXToOv3ZBpJpf7WVxnBzK5cOE6';

// When user clicks "Pay with CIB"
async function createPayment(amount, email, phone, orderId) {
  
  const paymentData = {
    amount: amount,              // How much to charge (in DA)
    currency: 'DZD',             // Algerian Dinar
    description: 'ZEED Order',
    customer: {
      email: email,
      phone: phone
    },
    // After payment, send user back here
    success_url: 'https://zeed.plus/?paid=yes&order=' + orderId,
    cancel_url: 'https://zeed.plus/?paid=no&order=' + orderId
  };

  // Send request to Slick Pay
  const response = await fetch('https://api.slick-pay.com/v1/invoices', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData)
  });

  const result = await response.json();
  
  // Return the payment link
  return result.checkout_url;
}
