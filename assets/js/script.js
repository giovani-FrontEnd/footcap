// set active to nav item
let navItems = document.querySelectorAll(".nav-link");

navItems.forEach(li => {
  li.addEventListener('click', (e) => {
    navbarCollapse.classList.remove('navbar-active');
    navItems.forEach(li => {
      li.classList.remove('active');
    });
    e.target.classList.add('active');
  })
});

// close navbar

let navabrToggler = document.querySelector(".navbar-toggler");
let navbarCollapse = document.querySelector(".navbar-collapse");
let overlayPage = document.querySelector(".overlay-page");

navabrToggler.onclick = function () {
  navbarCollapse.classList.add("navbar-active");
};


document.querySelector(".navbar-collapse .close").onclick = () => {
  navbarCollapse.classList.remove("navbar-active");
  overlayPage.classList.toggle('active');
};

let searchIcon = document.querySelector(".search-icon");
let searchCloseIcon = document.querySelector(".search-close-icon");

searchIcon.onclick = () => {
  navbarCollapse.classList.remove("navbar-active");
  document.querySelector(".input-search").classList.toggle("active");
  searchCloseIcon.classList.toggle("active");


  let prodcutSection = document.getElementById("products");
  window.scroll({
    top: prodcutSection.offsetTop - 150,
    behavior: "smooth"
  })
};

searchCloseIcon.onclick = () => {
  document.querySelector(".input-search").classList.toggle("active");
  searchCloseIcon.classList.toggle("active");
};

document.querySelector(".user-icon").onclick = () => {
  if(navbarCollapse.classList.contains('navbar-active')) {
    navbarCollapse.classList.remove('navbar-active');
  }
  document.getElementById("sign-in").classList.toggle("active");
};

document.querySelector('.close-sign-in').onclick = () => {
  document.getElementById("sign-in").classList.toggle("active");
}

// open mycart page 
let myCart = document.querySelector(".my-cart");

document.querySelector('.bag-icon').onclick = () => {
  if(navbarCollapse.classList.contains('navbar-active')) {
    navbarCollapse.classList.remove('navbar-active');
  }
  myCart.classList.add('active');
}

// close mycart page 
document.querySelector(".close-page").onclick = () => {
  myCart.classList.remove('active');
}

// open myheart page 
let myHeart = document.querySelector(".my-heart");

document.querySelector('.heart-icon').onclick = () => {
  if(navbarCollapse.classList.contains('navbar-active')) {
    navbarCollapse.classList.remove('navbar-active');
  }
  myHeart.classList.add('active');
}

// close myheart page 
document.querySelector(".my-heart .close-page").onclick = () => {
  myHeart.classList.remove('active');
}

// document key 
document.addEventListener('keypress', function (e) {
  if(e.key === "Escape") {
    console.log('escaeeeeeeee')
  }
})

window.addEventListener('click', function (e) {
  if(!navbarCollapse.contains(e.target)) {
   if(navbarCollapse.classList.contains('active')) {
    navbarCollapse.classList.remove('navbar-active')
   }
  }
})


let scrollTop = document.querySelector(".scroll-top");

document.onscroll = function () {
  if (window.scrollY >= 300) {   
    scrollTop.classList.add("active");
} else{
      scrollTop.classList.remove("active");
  }
}

scrollTop.addEventListener('click', () => {
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
})

// products box 

let eyes = document.querySelectorAll(".products .box .eye");
let imgView = document.querySelector('.image-view');
let closeView = document.querySelector('.image-view .closeImg');

eyes.forEach(eye => {
  eye.addEventListener('click', (e) => {
    let parentTarget = e.target.parentElement.parentElement;
    let imgElement = parentTarget.querySelector("img").src;
    imgView.classList.add('active');
    imgView.innerHTML += `<img class="img" src="${imgElement}">
    <i class="fa-solid fa-xmark closeImg" onclick="closeImg()"></i>  
    `
    
  })
})

function closeImg() {
  imgView.classList.remove('active');
  imgView.innerHTML = ''
}


// add product to cart

let shops = document.querySelectorAll(".info .shop");
let bagNum = document.querySelector(".bag-num");

shops.forEach(shop => {
  shop.addEventListener('click', (e) => {
    bagNum.innerHTML++;
    InfoCart(e.target.parentElement.parentElement);
  })
})

// info cart 

function InfoCart (elem) {
  let imageSrc = elem.querySelector('img').src;
  let title = elem.querySelector(".title-pro").innerHTML;
  let price = elem.querySelector('.price').innerHTML;
  
  let info = {
    image: imageSrc,
    title: title,
    price: price,
  }

  addToCart(info);
  localStorage.setItem('product', JSON.stringify(info));
  
  if(!localStorage.getItem("product")){
    localStorage.setItem("product", "[]");
 }
}



// add to cart 

let carts = document.querySelector('.carts');

function addToCart(info) {
  let carts = document.querySelector('.carts');

  let cart = `
      <div class="cart">
      <img src="${info.image}" alt="">
      <div class="info">
        <h3>${info.title}</h3>
        <input class="inp-num" type="number" value="1">
        <div class="price">${info.price}</div>
      </div>
      <i class="fa-solid fa-trash remove" onclick="removeItem(this.parentElement)"></i>
    </div>
  `

  carts.innerHTML += cart;

}

// remove carts
function removeItem(e) {
  e.remove();
  bagNum.innerHTML--;  
}

// my heart 

// add product to my-heart

let hearts = document.querySelectorAll(".info .heart");
let heartNum = document.querySelector(".heart-num");

hearts.forEach(heart => {
  heart.addEventListener('click', (e) => {
    heartNum.innerHTML++;
    InfoCartHeart(e.target.parentElement.parentElement);
  })
})

// info cart 

function InfoCartHeart (elem) {
  let imageSrc = elem.querySelector('img').src;
  let title = elem.querySelector(".title-pro").innerHTML;
  let price = elem.querySelector('.price').innerHTML;
  
  let info = {
    image: imageSrc,
    title: title,
    price: price,
  }

  addToCartHeart(info);
}



function addToCartHeart(info) {
  let myHeart = document.querySelector('.my-heart .carts');

  let cart = `
  <div class="cart">
  <div class="content">
    <img src="${info.image}" alt="">
  <div class="info">
    <h3>${info.title}</h3>
    <div class="price">$189</div>
  </div>
  <i title="remove" class="fa-solid fa-heart remove" onclick="removeItemheart(this.parentElement)"></i>
  </div>
  <button class="btn" onclick="InfoCartHeart(e.target.parentElement.parentElement)">Add To Cart</button>
</div>
  `

  myHeart.innerHTML += cart;

}

// remove carts
function removeItemheart(e) {
  e.remove();
  heartNum.innerHTML--;  
}


// bestesellers product 

let lists = document.querySelectorAll(".products ul li");
let boxes = document.querySelectorAll(".products .col-lg-3");

lists.forEach(li => {
  li.addEventListener('click', (e) => {
    lists.forEach(li => {
      li.classList.remove('active');
    });
    e.currentTarget.classList.add('active');

    boxes.forEach(box => {
      box.style.display = 'none';
    });
    let element = e.currentTarget.dataset.cont;
    document.querySelector(element).style.display = "block";
  })
});

// search product

let searchProduct = document.getElementById('search-product');

searchProduct.addEventListener('input', filterList);

function filterList() {
  const filter = searchProduct.value.toLowerCase()
  const listeItem = document.querySelectorAll(".products .box");

  listeItem.forEach((item) => {
    let text = item.querySelector('.title-pro').innerHTML;
    if(text.toLowerCase().includes(filter.toLowerCase())) {
      item.style.display = 'block'
    } else{
      item.style.display = 'none'
    }
  })
}