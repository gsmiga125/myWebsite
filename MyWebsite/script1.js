document.addEventListener("DOMContentLoaded",() => {
    const modal = document.getElementById("cart-modal");
    const view_cart=document.getElementById("view-cart");
    const clearcart_modal=document.getElementById("clear-cart");
    const closecart_modal=document.querySelector(".close-btn");
    const processorder_modal=document.getElementById ("process-order");
    const add_2_cart = document.querySelectorAll(".add2cart");

    if (view_cart && modal)  {
        view_cart.onclick = () => {
            opencart();
            modal.style.display="block";

        };
    }
    if (closecart_modal && modal) {
    
        closecart_modal.onclick = () => {
            modal.style.display="none";
        };

    }

    if (window && modal) {

        window.onclick = (x) => {
            if (x.target == modal)  {
                modal.style.display = "none";
            }
        };   
    }   

    if (clearcart_modal) {

        clearcart_modal.onclick = () => {
            sessionStorage.removeItem("cart");
            opencart();
            alert("Cart is cleared");
        };

    }

    if (processorder_modal && modal) {
        processorder_modal.onclick = () => {
            const cart_l = JSON.parse(sessionStorage.getItem("cart")) || [];
            if (cart_l.length === 0) {
                alert ("Cannot process order as you have no items in cart");
                return;
            }


            alert("Thank you for your order")
            sessionStorage.removeItem("cart");
            modal.style.display="none";
        };
    }

    if (add_2_cart.length >0) {
        add_2_cart.forEach(button => {
            button.addEventListener("click", () => {
                const storeitem = button.getAttribute('data-id');
                add_to_cart_func(storeitem);
            });
    
        });

    }



    const subscrb_btn = document.getElementById("signup-btn");
    const sub_email = document.getElementById("sub-email");

    if (subscrb_btn && sub_email) {
        subscrb_btn.addEventListener ("click", () => {
            const email_1=sub_email.value.trim();

            const email_form = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email_form.test(email_1)) {
                alert ("Invalid Email. Please re-enter");
                return;
            }

            const inputted_email=JSON.parse(localStorage.getItem("new_subscrb_email")) || [];

            inputted_email.push({
                email:email_1,
                sub_date: new Date().toISOString()
            });

            localStorage.setItem("new_subscrb_email", JSON.stringify(inputted_email));

            alert("Thank you for subscribing");
            sub_email.value = "";
        });
    }



//  <div class = "newsletter">//
// <h3>Subscribe</h3>//
//<p> Get our news and updates</p> //
//<input type="email" id = "sub-email" placeholder="enter email" />//
//<button id= "signup-btn">Sign Up</button> //


// Section for Form //
    const contact_Form = document.querySelector('.feedback-cont');
    if (contact_Form) {
        contact_Form.addEventListener ('submit',(a) => {
            a.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const feedback = document.getElementById('feedback').value.trim();
            const isCustomOrder = document.getElementById('custom-order').checked;
        
           
            
            const feedback_info = {
                name,email,phone,feedback,
                custom_Order:isCustomOrder
                

            };

            const current_feedback=JSON.parse(localStorage.getItem('feedback_info')) || [];
            current_feedback.push(feedback_info);
            localStorage.setItem('feedback_info', JSON.stringify(current_feedback));

            alert("Thank you for your Feedback, your form has been submitted and Saved");
            
            contact_Form.reset()

        });
    }




    
    
});
// Function for cart modal
function opencart() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const cart_container = document.getElementById("modal-cart-prod");
    const cart_title=document.getElementById("cart-title");
    cart_container.innerHTML = "";

    cart_title.textContent="Your Cart";

    if (cart.length === 0) {
        const emptynote = document.createElement("p");
        emptynote.textContent= "Your cart is empty";
        emptynote.style.color= "#131C26";
        cart_container.appendChild(emptynote);
        return;
    }
    const table = document.createElement("table");
    table.style.width= "70%";
    table.style.borderCollapse = "collapse";

    const headers1 = document.createElement("tr");
    const itemhead = document.createElement("th");
    const quanthd = document.createElement("th");

    itemhead.textContent= "Item Name";
    quanthd.textContent = "Quantity";

    itemhead.style.textAlign="left";
    quanthd.style.textAlign="left";
    itemhead.style.borderBottom="1px solid black";
    quanthd.style.borderBottom="1px solid black";
    itemhead.style.padding="5px";
    quanthd.style.padding="5px";

    headers1.appendChild(itemhead);
    headers1.appendChild(quanthd);
    table.appendChild(headers1);



    cart.forEach(item => {
        const row = document.createElement ("tr");
        const item_names=document.createElement ("td");
        const item_quant= document.createElement ("td");

        item_names.textContent=item.name;
        item_quant.textContent=item.quant;

        item_names.style.padding= "5px";
        item_quant.style.padding= "5px";
        item_names.style.borderBottom = "1px solid black";
        item_quant.style.borderBottom = "1px solid black";

        row.appendChild(item_names);
        row.appendChild(item_quant);
        table.appendChild (row);

    });
    cart_container.appendChild(table);

}

function add_to_cart_func (name) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const current_prod = cart.find(item => item.name === name); //curent product in cart

    if (current_prod) {
        current_prod.quant++;
    } else {
        cart.push ({name:name,quant:1});
    }
    sessionStorage.setItem("cart",JSON.stringify(cart));
    alert (`${name} added to cart`);
    

}

