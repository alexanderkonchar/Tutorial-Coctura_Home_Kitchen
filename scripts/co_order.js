// noinspection JSUnresolvedReference,UnnecessaryLocalVariableJS

"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Order Form Script
   
   Author: Alex Konchar
   Date: 2023-04-12
   
   Filename: co_order.js
   
   Function List
   =============
   
   calcOrder()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSCurrency(val)
      Formats val as U.S.A. currency
   
*/

window.addEventListener('load', () => {
    const orderForm = document.forms.orderForm;
    orderForm.elements.orderDate.value = new Date("September 14, 2018").toDateString();
    orderForm.elements.model.focus();

    // Calculate the cost of the order
    calcOrder();

    // Event handlers for the web form
    orderForm.elements.model.onchange = calcOrder;
    orderForm.elements.qty.onchange = calcOrder;

    const planOptions = document.querySelectorAll('input[name="protection"]');
    for (let i = 0; i < planOptions.length; ++i) {
        planOptions[i].onclick = calcOrder;
    }
});

function calcOrder() {
    const orderForm = document.forms.orderForm;

    // Calculate the initial cost of the order
    const mIndex = orderForm.elements.model.selectedIndex;
    const mCost = orderForm.elements.model.options[mIndex].value;
    const qIndex = orderForm.elements.qty.selectedIndex;
    const quantity = orderForm.elements.qty[qIndex].value;

    // Initial cost = model cost * quantity
    const initialCost = mCost * quantity;
    orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

    // Retrieve the cost of the user's protection plan
    const pCost = document.querySelector('input[name="protection"]:checked').value * quantity;
    orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

    // Calculate the order subtotal
    orderForm.elements.subtotal.value = formatNumber(initialCost + pCost, 2);

    // Calculate the sales tax
    const salesTax = 0.05 * (initialCost + pCost);
    orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

    // Calculate the cost of the total order
    const totalCost = initialCost + pCost + parseFloat(salesTax.toFixed(2));
    orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

    // Store the order details
    orderForm.elements.modelName.value = orderForm.elements.model.options[mIndex].text;

    orderForm.elements.protectionName.value = document.querySelector('input[name="protection"]:checked').nextSibling.nodeValue;
}

function formatNumber(val, decimals) {
    return val.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

function formatUSCurrency(val) {
    return val.toLocaleString('en-us', {style: "currency", currency: "USD"})
}