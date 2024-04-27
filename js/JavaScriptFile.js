//DOMOperations
const addProductBTN = document.querySelector(".addproduct");
const newproductlform__btn = document.querySelector(".newproduct__btn");
const closeProductFormBTN = document.querySelector(".closeform");
const productid = document.getElementById("productID");
const productPrice = document.getElementById("productPrice");
const productName = document.getElementById("productName");
const productimg = document.getElementById("productimg");
const unitinstock = document.getElementById("unitinstock");
const productListInDOM = document.querySelector(".products_list");
const noOfProductInBasket = document.querySelector(".header__item-counter");
const action_basket = document.querySelector(".action_basket");
const basket__items = document.querySelector(".basket__items");
const searchkeyword = document.querySelector(".search__input");
const editProductBTN = document.querySelector(".editproduct");
const catItem = document.querySelectorAll(".category");

let productsForSearch;
// console.log(productsForSearch);

//AddEvents
document.addEventListener("DOMContentLoaded", () => {
  productsForSearch = utility.readfromlocalstorage("Products");
  let listFromscratch = Product.getAllProducts();
  const Put = Product.putProductInDOM(listFromscratch);
  productListInDOM.innerHTML = Put;
  utility.addActionToclass(".product__detail--btn");
  utility.addActionToclass(".product__detail--btn__edit");
  noOfProductInBasket.innerHTML = Basket.noOfProduct();
  catItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      const filteredProduct = Product.findByCat(listFromscratch, e);
      const putFilteredProduct = Product.putProductInDOM(filteredProduct);
      productListInDOM.innerHTML = putFilteredProduct;
    });
  });
});

searchkeyword.addEventListener("input", (e) => {
  let serachResult = [];
  if (e.target.value.length < 2) {
    serachResult = Product.putProductInDOM(productsForSearch);
    productListInDOM.innerHTML = serachResult;
  } else {
    const findItems = utility.searchfunc(productsForSearch, e.target.value);
    serachResult = Product.putProductInDOM(findItems);
    productListInDOM.innerHTML = serachResult;
    utility.addActionToclass(".product__detail--btn");
  }
});
closeProductFormBTN.addEventListener("click", () => {
  document
    .querySelector(".modal.addproduct--form")
    .classList.add("modal--deactive");
  productsForSearch = utility.readfromlocalstorage("Products");
});
newproductlform__btn.addEventListener("click", () => {
  document
    .querySelector(".modal.addproduct--form")
    .classList.remove("modal--deactive");
  productName.value = "";
  productPrice.value = "";
  productimg.value = "";
  unitinstock.value = "";
  const editBtn = document.querySelector(".editproduct");
  editBtn.style.display = "none";
  addProductBTN.style.display = "inline";
});

addProductBTN.addEventListener("click", () => {
  const getDropdownValue_Cat = document.querySelector("#categorydropdown");
  const valueofcategory =
    getDropdownValue_Cat[getDropdownValue_Cat.options.selectedIndex].value;
  const textofcategory =
    getDropdownValue_Cat[getDropdownValue_Cat.options.selectedIndex].text;

  const p = new Product({
    title: productName.value,
    price: productPrice.value,
  });
  p.SetUnitsInStock = unitinstock.value;
  p.UnitInStock = p.GetUnitsInStock;
  p.SetImgSource = productimg.value;
  p.img = p.GetImgSource;
  p.id = p.Generateid;
  p.category.push({ value: valueofcategory, text: textofcategory });
  // console.log(p);
  Product.saveProduct(p);
  const allProducts = Product.getAllProducts();
  const shouldDisplay = Product.putProductInDOM(allProducts);

  productListInDOM.innerHTML = shouldDisplay;
  productName.value = "";
  productPrice.value = "";
  unitinstock.value = "";
  productimg.value = "";
  utility.addActionToclass(".product__detail--btn");
  utility.addActionToclass(".product__detail--btn__edit");
});
editProductBTN.addEventListener("click", (e) => {
  const getDropdownValue_Cat = document.querySelector("#categorydropdown");
  const valueofcategory =
    getDropdownValue_Cat[getDropdownValue_Cat.options.selectedIndex].value;
  const textofcategory =
    getDropdownValue_Cat[getDropdownValue_Cat.options.selectedIndex].text;
  const editedProductId = document.getElementById("productID");
  const editedProductName = document.getElementById("productName");
  const editedProductPrice = document.getElementById("productPrice");
  const editedProductimg = document.getElementById("productimg");
  const editedProductUnitInStock = document.getElementById("unitinstock");
  const p = new Product({
    title: editedProductName.value,
    price: editedProductPrice.value,
  });
  p.id = editedProductId.value;
  p.SetImgSource = editedProductimg.value;
  p.img = p.GetImgSource;
  p.SetUnitsInStock = editedProductUnitInStock.value;
  p.UnitInStock = p.GetUnitsInStock;
  p.category.push({ value: valueofcategory, text: textofcategory });
  const products = utility.readfromlocalstorage("Products");
  const findIndex = products.findIndex((item) => {
    return item.id == productid.value;
  });
  products.splice(findIndex, 1, p);

  utility.addRemoveTotally("Products", products);

  const allProducts = Product.getAllProducts();

  const shouldDisplay = Product.putProductInDOM(allProducts);

  productListInDOM.innerHTML = shouldDisplay;
  productName.value = "";
  productPrice.value = "";
  unitinstock.value = "";
  productimg.value = "";
  utility.addActionToclass(".product__detail--btn");
  utility.addActionToclass(".product__detail--btn__edit");
});
action_basket.addEventListener("click", () => {
  document
    .querySelector(".basket--window.modal")
    .classList.remove("modal--deactive");
  const modal_close = document.querySelector(".basket--window.modal");
  modal_close.addEventListener("click", (e) => {
    if (e.target.classList.contains("basket--window")) {
      e.target.classList.add("modal--deactive");
      let listFromscratch = Product.getAllProducts();
      const Put = Product.putProductInDOM(listFromscratch);
      productListInDOM.innerHTML = Put;
      utility.addActionToclass(".product__detail--btn");
      utility.addActionToclass(".product__detail--btn__edit");
      noOfProductInBasket.innerHTML = Basket.noOfProduct();
    }
  });
  const productsInBasketInDOM = Basket.addItemsInBasketToDOM();
  if (productsInBasketInDOM.length == 0) {
    document.querySelector(".basket__total").classList.add("noshow");
  } else {
    document.querySelector(".basket__emptyimg").classList.add("noshow");
    document.querySelector(".basket__total").classList.remove("noshow");
    basket__items.innerHTML = productsInBasketInDOM;
    //const deleteItem = document.querySelectorAll(".basket__itemdelete");
    const products = utility.readfromlocalstorage("Products");
    const basket = utility.readfromlocalstorage("basket");
    const b = new Basket();
    basket.forEach((item) => {
      item.totalRow = item.qty * item.price;
      b.products.push(item);
    });
    const totalInBasket = b.basketTotal;

    increaseAction(products, b);
    decreaseAction(products, b);

    // deleteItem.forEach((item) => {
    //   item.addEventListener("click", (e) => {
    //     console.log("hi");
    //     // Basket.increase_decreaseproduct(products, b.products, e);
    //     // basket__items.innerHTML = "";
    //     // const productsInBasketInDOM = Basket.addItemsInBasketToDOM();
    //     // basket__items.innerHTML = productsInBasketInDOM;
    //     // document.querySelector(
    //     //   ".basket__total"
    //     // ).innerHTML = `Payable: ${utility.price_comma(String(b.basketTotal))}`;
    //     // noOfProductInBasket.innerHTML = Basket.noOfProduct();
    //     // increaseAction(products, b);
    //     // decreaseAction(products, b);
    //     // if (productsInBasketInDOM.length == 0) {
    //     //   document.querySelector(".basket__total").classList.add("noshow");
    //     //   document
    //     //     .querySelector(".basket__emptyimg")
    //     //     .classList.remove("noshow");
    //     // }
    //   });
    // });
    document.querySelector(
      ".basket__total"
    ).innerHTML = `Payable: ${utility.price_comma(String(totalInBasket))}`;
  }
});

//classes
class Product {
  constructor({ title, price }) {
    this.title = title;
    this.price = price;
    this.Generateid;
  }
  #unitinstock = 0;
  #imgsource = "";
  category = [];

  get GetImgSource() {
    return this.#imgsource;
  }
  set SetImgSource(value) {
    this.#imgsource = value;
  }
  get GetUnitsInStock() {
    return this.#unitinstock;
  }
  set SetUnitsInStock(value) {
    this.#unitinstock = value;
  }

  get Generateid() {
    const _id = Date.now();
    return _id;
  }
  // static calcQTY(product, e) {
  //   let result = "";

  //   const products = utility.readfromlocalstorage("Products");
  //   const basket = utility.readfromlocalstorage("basket");
  //   const productIndex = products.findIndex((item) => {
  //     return item.id == product.id;
  //   });
  //   const basketIndex = basket.findIndex((item) => {
  //     return item.id == product.id;
  //   });

  //   if (
  //     String(e.target.innerHTML) == "Add To Cart" ||
  //     String(e.target.alt) == "Item_Increase"
  //   ) {
  //     if (products[productIndex].UnitInStock >= 1) {
  //       products[productIndex].UnitInStock =
  //         Number(products[productIndex].UnitInStock) - 1;
  //       product.qty = product.qty + 1;
  //       utility.addRemoveTotally("Products", products);
  //       utility.writetolocalstorage("basket", product);
  //       return [product, products[productIndex].UnitInStock];
  //     } else {
  //       result = "OUTOFSTOCK";
  //     }
  //   } else if (String(e.target.innerHTML) == "Added") {
  //     products[productIndex].UnitInStock =
  //       Number(products[productIndex].UnitInStock) + 1;

  //     basket[basketIndex].qty = Number(basket[basketIndex].qty - 1);
  //     if (basket[basketIndex].qty <= 0) {
  //       basket.splice(basketIndex, 1);
  //       utility.addRemoveTotally("Products", products);
  //       utility.addRemoveTotally("basket", basket);
  //       return [0, products[productIndex].UnitInStock];
  //     } else {
  //       utility.addRemoveTotally("Products", products);
  //       utility.addRemoveTotally("basket", basket);
  //       return [basket[basketIndex].qty, products[productIndex].UnitInStock];
  //     }
  //   }
  // }
  static getAllProducts() {
    const result = JSON.parse(localStorage.getItem("Products")) || [];

    return result;
  }
  static saveProduct(p) {
    let productsResult = Product.getAllProducts();
    productsResult.push(p);
    localStorage.setItem("Products", JSON.stringify(productsResult));
  }
  static putProductInDOM(products) {
    let result = [];

    products.forEach((item) => {
      result += `<li class="product" id="${item.id}">
      <span class="product__img"
        ><img src=${item.img}
      /></span>
      <span class="product__detail">
      <span class="stockstatus deactive">OUT OF STOCK</span>
        <span class="product__title">${item.title}</span>
        <span class="product__desc">
          The new M2 chip makes the 13‑inch MacBook Pro more capable
          than ever.
        </span>

        <span class="product__price">${utility.price_comma(
          String(item.price)
        )}</span>

        <span  class="product__detail--btn ${
          utility.Dynamic_Content(item.id)[1]
        }" data-product_id="${item.id}">${
        utility.Dynamic_Content(item.id)[0]
      }</span>
      <span class="product__detail--btn__edit" style="justify-self:center;margin-top:0.5rem" data-product_id="${
        item.id
      }">EditProduct</span>
      </span>
    </li>`;
    });

    return result;
  }
  static findByCat(products, e) {
    let result = [];
    if (e.target.textContent == "All") {
      result = products;
    } else {
      result = products.filter((item) => {
        return item.category[0].text == e.target.textContent;
      });
    }
    console.log(result);
    return result;
  }
  CheckProductAvailable(e) {
    let result;
    // console.log(e.target.classList.contains("1"));
    if (e.target != undefined) {
      if (String(e.target.innerHTML) == "Add To Cart") {
        if (this.GetUnitsInStock >= 1) {
          this.SetUnitsInStock = this.GetUnitsInStock - 1;
          this.qty = 1;
        } else {
          result = "OUT OF STOCK";
        }
      } else if (String(e.target.alt) == "Item_Increase") {
        if (this.GetUnitsInStock >= 1) {
          this.SetUnitsInStock = this.GetUnitsInStock - 1;
          this.qty = this.qty + 1;
        } else {
          return (result = "OUT OF STOCK");
        }
      } else if (String(e.target.alt) == "Item_Decrease") {
        if (this.qty > 1) {
          this.qty = this.qty - 1;
          this.SetUnitsInStock = this.GetUnitsInStock + 1;
        }
      } else if (String(e.target.innerHTML) == "Added") {
        // this.SetUnitsInStock = this.GetUnitsInStock + 1;
        // this.qty = 0;
        this.SetUnitsInStock = this.GetUnitsInStock + this.qty;
        this.qty = 0;
      } else if (e.target.innerHTML == "OUT OF STOCK") {
        this.SetUnitsInStock = 0;
        return (result = "OUT OF STOCK");
      } else if (e.target.classList.contains("basket__itemdelete")) {
        this.SetUnitsInStock = this.GetUnitsInStock + this.qty;
        this.qty = 0;
      }
    } else {
      this.SetUnitsInStock = this.GetUnitsInStock + this.qty;
      this.qty = 0;
    }

    return this;
  }
}

class Basket {
  // constructor() {
  //   this.#productsListInbasket = utility.readfromlocalstorage("basket");
  // }
  // #productsListInbasket = [];
  // #re = [];
  // get pros() {
  //   return this.#re;
  // }
  // set pros(value) {
  //   this.#re.push(value);
  // }
  products = [];
  get basketTotal() {
    return this.#total();
  }
  #total() {
    return this.products.reduce((acc, cur) => {
      return Number(acc) + Number(cur.price * cur.qty);
    }, 0);
  }
  static addItemsInBasketToDOM() {
    let result = [];
    const productsListInbasket = utility.readfromlocalstorage("basket");
    productsListInbasket.forEach((item) => {
      result += `<li id="${item.id}" class="basket__item" data-product_id=${
        item.id
      }>

    <span class="basket__itempic"
      ><img src=${item.img_s} alt=""
    /></span>
    <span class="basket__itemtitle"
      ><span class="basket__itemname">${item.title}</span>
      <span class="basket__itemprice">${utility.price_comma(
        String(item.price)
      )}</span>
      <span class="outofstockmessge noshow">OUT OF STOCK</span>
    </span>
    <span class="basket__itemNo"><div class="basket__itemNo__increase"><img src="./Assets/Img/arrow-up-2.svg"  data-product_id=${
      item.id
    } alt="Item_Increase" /></div
      ><span class="basket__itemNo__no">${item.qty}</span
      ><div class="basket__itemNo__decrease" 
        ><img src="./Assets/Img/arrow-down-1.svg" data-product_id=${
          item.id
        } alt="Item_Decrease" /></div
    ></span>
    <div class="basket__itemdelete" data-product_id=${
      item.id
    } onclick=deletefunc(this)
      ><img src="./Assets/Img/trash.svg" alt=""
    /></div>
    <span class="basket__totalrow">${utility.price_comma(
      String(item.price * item.qty)
    )}</span>
  </li>`;
    });

    return result;
  }
  static noOfProduct() {
    let basketitems = utility.readfromlocalstorage("basket");
    let result = 0;
    basketitems.forEach((i) => {
      result = result + 1;
    });
    return result;
  }
  static AddRemoveProduct(productsInBasket, e) {
    const pInBasket = productsInBasket.findIndex((item) => {
      return item.id == e.target.dataset.product_id;
    });
    const allProducts = utility.readfromlocalstorage("Products");
    const findproductIndex = allProducts.findIndex((item) => {
      return item.id == e.target.dataset.product_id;
    });
    const p = new Product({
      title: allProducts[findproductIndex].title,
      price: allProducts[findproductIndex].price,
    });
    p.id = allProducts[findproductIndex].id;
    allProducts[findproductIndex].category.forEach((item) => {
      p.category.push({ id: item.value, text: item.text });
    });
    console.log(allProducts[findproductIndex].category);
    const imgSrcBasket = `${
      allProducts[findproductIndex].img.split(".")[1]
    }_small.png`;
    p.img_s = imgSrcBasket;
    p.SetUnitsInStock = allProducts[findproductIndex].UnitInStock;
    if (productsInBasket[pInBasket] != undefined) {
      // console.log(productsInBasket[pInBasket].qty);
      p.qty = productsInBasket[pInBasket].qty;
    }

    let newStockStatus = p.CheckProductAvailable(e);
    if (newStockStatus != "OUT OF STOCK") {
      allProducts[findproductIndex].UnitInStock =
        newStockStatus.GetUnitsInStock;

      utility.addRemoveTotally("Products", allProducts);
      if (pInBasket < 0) {
        const { title, id, price, qty, img_s, category } = newStockStatus;
        utility.writetolocalstorage("basket", {
          title,
          id,
          price,
          qty,
          img_s,
          category,
        });
        noOfProductInBasket.innerHTML = Basket.noOfProduct();
        e.target.innerHTML = "Added";
      } else {
        productsInBasket.splice(pInBasket, 1);
        utility.addRemoveTotally("basket", productsInBasket);
        noOfProductInBasket.innerHTML = Basket.noOfProduct();
        e.target.innerHTML = "Add To Cart";
      }
    }
  }
  static increase_decreaseproduct(products, basket, e) {
    const pInProducts = products.findIndex((item) => {
      if (e.target != undefined) {
        return item.id == e.target.dataset.product_id;
      } else {
        return item.id == e.dataset.product_id;
      }
    });

    const pInBasket = basket.findIndex((item) => {
      if (e.target != undefined) {
        return item.id == e.target.dataset.product_id;
      } else {
        return item.id == e.dataset.product_id;
      }
    });

    const p = new Product({
      title: products[pInProducts].title,
      price: products[pInProducts].price,
    });
    p.SetUnitsInStock = products[pInProducts].UnitInStock;

    p.qty = basket[pInBasket].qty;
    const newUnitAndQTY = p.CheckProductAvailable(e);
    if (newUnitAndQTY == "OUT OF STOCK") {
      return "OUT OF STOCK";
    } else if (newUnitAndQTY.qty == 0) {
      products[pInProducts].UnitInStock = newUnitAndQTY.GetUnitsInStock;
      utility.addRemoveTotally("Products", products);
      basket.splice(pInBasket, 1);
      utility.addRemoveTotally("basket", basket);
    } else {
      products[pInProducts].UnitInStock = newUnitAndQTY.GetUnitsInStock;
      utility.addRemoveTotally("Products", products);
      basket[pInBasket].qty = newUnitAndQTY.qty;
      basket[pInBasket].totalRow =
        basket[pInBasket].qty * basket[pInBasket].price;
      utility.addRemoveTotally("basket", basket);
      const liID = document.getElementById(`${e.target.dataset.product_id}`);
      const newQTY = liID.querySelector(".basket__itemNo__no");
      const newTotalRow = liID.querySelector(".basket__totalrow");
      newQTY.innerHTML = basket[pInBasket].qty;
      newTotalRow.innerHTML = utility.price_comma(
        String(basket[pInBasket].totalRow)
      );
    }
  }
}

class utility {
  static readfromlocalstorage(rowname) {
    const result = JSON.parse(localStorage.getItem(rowname)) || [];
    // console.log(result);
    return result;
  }
  static writetolocalstorage(rowname, object) {
    let result = this.readfromlocalstorage(rowname);
    result.push(object);
    localStorage.setItem(rowname, JSON.stringify(result));
  }
  static Dynamic_Content(productid) {
    const products = this.readfromlocalstorage("Products");
    const basket = this.readfromlocalstorage("basket");
    const product = products.find((i) => {
      return i.id == productid;
    });
    if (product.UnitInStock < 1) {
      return ["OUT OF STOCK", "buttondisable"];
    }
    if (
      basket.findIndex((i) => {
        return productid == i.id;
      }) >= 0
    ) {
      return ["Added", "button2"];
    } else {
      return ["Add To Cart", "button2"];
    }
  }
  static addRemoveTotally(item, collection) {
    localStorage.removeItem(item);
    collection.forEach((i) => {
      this.writetolocalstorage(item, i);
    });
  }
  static addActionToclass(className) {
    let result = 0;
    if (className == ".product__detail--btn") {
      const addBTNArray = document.querySelectorAll(className);
      addBTNArray.forEach((item) => {
        item.addEventListener("click", (e) => {
          const producstInBasket = utility.readfromlocalstorage("basket");
          console.log(producstInBasket);
          Basket.AddRemoveProduct(producstInBasket, e);
        });
      });
    } else if (className == ".product__detail--btn__edit") {
      const editbtn = document.querySelectorAll(".product__detail--btn__edit");
      editbtn.forEach((item) => {
        item.addEventListener("click", (e) => {
          document
            .querySelector(".modal.addproduct--form")
            .classList.remove("modal--deactive");
          const editBtn = document.querySelector(".editproduct");

          editBtn.style.display = "inline";
          addProductBTN.style.display = "none";
          const products = utility.readfromlocalstorage("Products");
          const mustBeEditIndex = products.findIndex((item) => {
            return item.id == e.target.dataset.product_id;
          });

          const p = new Product({
            title: products[mustBeEditIndex].title,
            price: products[mustBeEditIndex].price,
          });
          p.SetUnitsInStock = products[mustBeEditIndex].UnitInStock;
          p.SetImgSource = products[mustBeEditIndex].img;
          p.id = products[mustBeEditIndex].id;

          const getCatFromDropdown =
            document.querySelector("#categorydropdown");
          console.log(getCatFromDropdown.options.selectedIndex);
          getCatFromDropdown.options.selectedIndex =
            products[mustBeEditIndex].category[0].value;

          productName.value = p.title;
          productid.value = p.id;
          productPrice.value = p.price;
          productimg.value = p.GetImgSource;
          unitinstock.value = p.GetUnitsInStock;
        });
      });
    }
  }
  static price_comma(price) {
    let result;
    if (price.length <= 3) {
      result = price;
      return result;
    }
    const priceLength = String(price.length);
    let divided_By3 = Math.floor(priceLength / 3);
    const remain_By3 = priceLength % 3;
    if (remain_By3 == 0) {
      divided_By3 = divided_By3 - 1;
    }
    const d = [...price];
    let c = d.length;

    for (let i = divided_By3; i > 0; i--) {
      c = c - 3;
      d.splice(c, 0, ",");
    }
    result = d.join("");
    return result;
  }
  static searchfunc(products, searchkey) {
    console.log(products);
    let result = [];
    products.forEach((item) => {
      if (item.title.toLowerCase().includes(searchkey.toLowerCase())) {
        result.push(item);
      }
    });
    return result;
  }
}

//function
function increaseAction(products, basketinstance) {
  const increaseBasketItem = document.querySelectorAll(
    ".basket__itemNo__increase"
  );
  increaseBasketItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      const result = Basket.increase_decreaseproduct(
        products,
        basketinstance.products,
        e
      );
      if (result == "OUT OF STOCK") {
        const outofstockRaise = document.getElementById(
          `${e.target.dataset.product_id}`
        );
        outofstockRaise
          .querySelector(".outofstockmessge")
          .classList.remove("noshow");
      } else {
        document.querySelector(
          ".basket__total"
        ).innerHTML = `Payable: ${utility.price_comma(
          String(basketinstance.basketTotal)
        )}`;
      }
    });
  });
}
function decreaseAction(products, basketinstance) {
  const decreaseBasketItem = document.querySelectorAll(
    ".basket__itemNo__decrease"
  );
  decreaseBasketItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      const result = Basket.increase_decreaseproduct(
        products,
        basketinstance.products,
        e
      );
      if (result != "OUT OF STOCK") {
        const clearoutofstockRaise = document.getElementById(
          `${e.target.dataset.product_id}`
        );
        clearoutofstockRaise
          .querySelector(".outofstockmessge")
          .classList.add("noshow");
      }
      document.querySelector(
        ".basket__total"
      ).innerHTML = `Payable: ${utility.price_comma(
        String(basketinstance.basketTotal)
      )}`;
    });
  });
}
function deletefunc(e) {
  const products = utility.readfromlocalstorage("Products");
  const basket = utility.readfromlocalstorage("basket");
  const b = new Basket();
  basket.forEach((item) => {
    item.totalRow = item.qty * item.price;
    b.products.push(item);
  });
  Basket.increase_decreaseproduct(products, b.products, e);
  basket__items.innerHTML = "";
  const productsInBasketInDOM = Basket.addItemsInBasketToDOM();
  basket__items.innerHTML = productsInBasketInDOM;
  document.querySelector(
    ".basket__total"
  ).innerHTML = `Payable: ${utility.price_comma(String(b.basketTotal))}`;
  noOfProductInBasket.innerHTML = Basket.noOfProduct();
  increaseAction(products, b);
  decreaseAction(products, b);
  if (productsInBasketInDOM.length == 0) {
    document.querySelector(".basket__total").classList.add("noshow");
    document.querySelector(".basket__emptyimg").classList.remove("noshow");
  }
}

console.log(utility.price_comma("3215"));
console.log(Date.now());
let a = {};
a.id = "j";
a.value = "p";
console.log(a);
a.id = "k";
a.value = "l";
console.log(a);
