"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
//DOMOperations
var addProductBTN = document.querySelector(".addproduct");
var newproductlform__btn = document.querySelector(".newproduct__btn");
var closeProductFormBTN = document.querySelector(".closeform");
var productid = document.getElementById("productID");
var productPrice = document.getElementById("productPrice");
var productName = document.getElementById("productName");
var productimg = document.getElementById("productimg");
var unitinstock = document.getElementById("unitinstock");
var productListInDOM = document.querySelector(".products_list");
var noOfProductInBasket = document.querySelector(".header__item-counter");
var action_basket = document.querySelector(".action_basket");
var basket__items = document.querySelector(".basket__items");
var searchkeyword = document.querySelector(".search__input");
var editProductBTN = document.querySelector(".editproduct");
var catItem = document.querySelectorAll(".category");
var productsForSearch;
// console.log(productsForSearch);

//AddEvents
document.addEventListener("DOMContentLoaded", function () {
  productsForSearch = utility.readfromlocalstorage("Products");
  var listFromscratch = Product.getAllProducts();
  var Put = Product.putProductInDOM(listFromscratch);
  productListInDOM.innerHTML = Put;
  utility.addActionToclass(".product__detail--btn");
  utility.addActionToclass(".product__detail--btn__edit");
  noOfProductInBasket.innerHTML = Basket.noOfProduct();
  catItem.forEach(function (item) {
    item.addEventListener("click", function (e) {
      var filteredProduct = Product.findByCat(listFromscratch, e);
      var putFilteredProduct = Product.putProductInDOM(filteredProduct);
      productListInDOM.innerHTML = putFilteredProduct;
    });
  });
});
searchkeyword.addEventListener("input", function (e) {
  var serachResult = [];
  if (e.target.value.length < 2) {
    serachResult = Product.putProductInDOM(productsForSearch);
    productListInDOM.innerHTML = serachResult;
  } else {
    var findItems = utility.searchfunc(productsForSearch, e.target.value);
    serachResult = Product.putProductInDOM(findItems);
    productListInDOM.innerHTML = serachResult;
    utility.addActionToclass(".product__detail--btn");
  }
});
closeProductFormBTN.addEventListener("click", function () {
  document.querySelector(".modal.addproduct--form").classList.add("modal--deactive");
  productsForSearch = utility.readfromlocalstorage("Products");
});
newproductlform__btn.addEventListener("click", function () {
  document.querySelector(".modal.addproduct--form").classList.remove("modal--deactive");
  productName.value = "";
  productPrice.value = "";
  productimg.value = "";
  unitinstock.value = "";
  var editBtn = document.querySelector(".editproduct");
  editBtn.style.display = "none";
  addProductBTN.style.display = "inline";
});
addProductBTN.addEventListener("click", function () {
  var getDropdownValue_Cat = document.querySelector("#categorydropdown");
  var valueofcategory = getDropdownValue_Cat[getDropdownValue_Cat.options.selectedIndex].value;
  var textofcategory = getDropdownValue_Cat[getDropdownValue_Cat.options.selectedIndex].text;
  var p = new Product({
    title: productName.value,
    price: productPrice.value
  });
  p.SetUnitsInStock = unitinstock.value;
  p.UnitInStock = p.GetUnitsInStock;
  p.SetImgSource = productimg.value;
  p.img = p.GetImgSource;
  p.id = p.Generateid;
  p.category.push({
    value: valueofcategory,
    text: textofcategory
  });
  // console.log(p);
  Product.saveProduct(p);
  var allProducts = Product.getAllProducts();
  var shouldDisplay = Product.putProductInDOM(allProducts);
  productListInDOM.innerHTML = shouldDisplay;
  productName.value = "";
  productPrice.value = "";
  unitinstock.value = "";
  productimg.value = "";
  utility.addActionToclass(".product__detail--btn");
  utility.addActionToclass(".product__detail--btn__edit");
});
editProductBTN.addEventListener("click", function (e) {
  var getDropdownValue_Cat = document.querySelector("#categorydropdown");
  var valueofcategory = getDropdownValue_Cat[getDropdownValue_Cat.options.selectedIndex].value;
  var textofcategory = getDropdownValue_Cat[getDropdownValue_Cat.options.selectedIndex].text;
  var editedProductId = document.getElementById("productID");
  var editedProductName = document.getElementById("productName");
  var editedProductPrice = document.getElementById("productPrice");
  var editedProductimg = document.getElementById("productimg");
  var editedProductUnitInStock = document.getElementById("unitinstock");
  var p = new Product({
    title: editedProductName.value,
    price: editedProductPrice.value
  });
  p.id = editedProductId.value;
  p.SetImgSource = editedProductimg.value;
  p.img = p.GetImgSource;
  p.SetUnitsInStock = editedProductUnitInStock.value;
  p.UnitInStock = p.GetUnitsInStock;
  p.category.push({
    value: valueofcategory,
    text: textofcategory
  });
  var products = utility.readfromlocalstorage("Products");
  var findIndex = products.findIndex(function (item) {
    return item.id == productid.value;
  });
  products.splice(findIndex, 1, p);
  utility.addRemoveTotally("Products", products);
  var allProducts = Product.getAllProducts();
  var shouldDisplay = Product.putProductInDOM(allProducts);
  productListInDOM.innerHTML = shouldDisplay;
  productName.value = "";
  productPrice.value = "";
  unitinstock.value = "";
  productimg.value = "";
  utility.addActionToclass(".product__detail--btn");
  utility.addActionToclass(".product__detail--btn__edit");
});
action_basket.addEventListener("click", function () {
  document.querySelector(".basket--window.modal").classList.remove("modal--deactive");
  var modal_close = document.querySelector(".basket--window.modal");
  modal_close.addEventListener("click", function (e) {
    if (e.target.classList.contains("basket--window")) {
      e.target.classList.add("modal--deactive");
      var listFromscratch = Product.getAllProducts();
      var Put = Product.putProductInDOM(listFromscratch);
      productListInDOM.innerHTML = Put;
      utility.addActionToclass(".product__detail--btn");
      utility.addActionToclass(".product__detail--btn__edit");
      noOfProductInBasket.innerHTML = Basket.noOfProduct();
    }
  });
  var productsInBasketInDOM = Basket.addItemsInBasketToDOM();
  if (productsInBasketInDOM.length == 0) {
    document.querySelector(".basket__total").classList.add("noshow");
  } else {
    document.querySelector(".basket__emptyimg").classList.add("noshow");
    document.querySelector(".basket__total").classList.remove("noshow");
    basket__items.innerHTML = productsInBasketInDOM;
    //const deleteItem = document.querySelectorAll(".basket__itemdelete");
    var products = utility.readfromlocalstorage("Products");
    var basket = utility.readfromlocalstorage("basket");
    var b = new Basket();
    basket.forEach(function (item) {
      item.totalRow = item.qty * item.price;
      b.products.push(item);
    });
    var totalInBasket = b.basketTotal;
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
    document.querySelector(".basket__total").innerHTML = "Payable: ".concat(utility.price_comma(String(totalInBasket)));
  }
});

//classes
var _unitinstock = /*#__PURE__*/new WeakMap();
var _imgsource = /*#__PURE__*/new WeakMap();
var Product = /*#__PURE__*/function () {
  function Product(_ref) {
    var title = _ref.title,
      price = _ref.price;
    _classCallCheck(this, Product);
    _classPrivateFieldInitSpec(this, _unitinstock, 0);
    _classPrivateFieldInitSpec(this, _imgsource, "");
    _defineProperty(this, "category", []);
    this.title = title;
    this.price = price;
    this.Generateid;
  }
  return _createClass(Product, [{
    key: "GetImgSource",
    get: function get() {
      return _classPrivateFieldGet(_imgsource, this);
    }
  }, {
    key: "SetImgSource",
    set: function set(value) {
      _classPrivateFieldSet(_imgsource, this, value);
    }
  }, {
    key: "GetUnitsInStock",
    get: function get() {
      return _classPrivateFieldGet(_unitinstock, this);
    }
  }, {
    key: "SetUnitsInStock",
    set: function set(value) {
      _classPrivateFieldSet(_unitinstock, this, value);
    }
  }, {
    key: "Generateid",
    get: function get() {
      var _id = Date.now();
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
  }, {
    key: "CheckProductAvailable",
    value: function CheckProductAvailable(e) {
      var result;
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
            return result = "OUT OF STOCK";
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
          return result = "OUT OF STOCK";
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
  }], [{
    key: "getAllProducts",
    value: function getAllProducts() {
      var result = JSON.parse(localStorage.getItem("Products")) || [];
      return result;
    }
  }, {
    key: "saveProduct",
    value: function saveProduct(p) {
      var productsResult = Product.getAllProducts();
      productsResult.push(p);
      localStorage.setItem("Products", JSON.stringify(productsResult));
    }
  }, {
    key: "putProductInDOM",
    value: function putProductInDOM(products) {
      var result = [];
      products.forEach(function (item) {
        result += "<li class=\"product\" id=\"".concat(item.id, "\">\n      <span class=\"product__img\"\n        ><img src=").concat(item.img, "\n      /></span>\n      <span class=\"product__detail\">\n      <span class=\"stockstatus deactive\">OUT OF STOCK</span>\n        <span class=\"product__title\">").concat(item.title, "</span>\n        <span class=\"product__desc\">\n          The new M2 chip makes the 13\u2011inch MacBook Pro more capable\n          than ever.\n        </span>\n\n        <span class=\"product__price\">").concat(utility.price_comma(String(item.price)), "</span>\n\n        <span  class=\"product__detail--btn ").concat(utility.Dynamic_Content(item.id)[1], "\" data-product_id=\"").concat(item.id, "\">").concat(utility.Dynamic_Content(item.id)[0], "</span>\n      <span class=\"product__detail--btn__edit\" style=\"justify-self:center;margin-top:0.5rem\" data-product_id=\"").concat(item.id, "\">EditProduct</span>\n      </span>\n    </li>");
      });
      return result;
    }
  }, {
    key: "findByCat",
    value: function findByCat(products, e) {
      var result = [];
      if (e.target.textContent == "All") {
        result = products;
      } else {
        result = products.filter(function (item) {
          return item.category[0].text == e.target.textContent;
        });
      }
      console.log(result);
      return result;
    }
  }]);
}();
var _Basket_brand = /*#__PURE__*/new WeakSet();
var Basket = /*#__PURE__*/function () {
  function Basket() {
    _classCallCheck(this, Basket);
    _classPrivateMethodInitSpec(this, _Basket_brand);
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
    _defineProperty(this, "products", []);
  }
  return _createClass(Basket, [{
    key: "basketTotal",
    get: function get() {
      return _assertClassBrand(_Basket_brand, this, _total).call(this);
    }
  }], [{
    key: "addItemsInBasketToDOM",
    value: function addItemsInBasketToDOM() {
      var result = [];
      var productsListInbasket = utility.readfromlocalstorage("basket");
      productsListInbasket.forEach(function (item) {
        result += "<li id=\"".concat(item.id, "\" class=\"basket__item\" data-product_id=").concat(item.id, ">\n\n    <span class=\"basket__itempic\"\n      ><img src=").concat(item.img_s, " alt=\"\"\n    /></span>\n    <span class=\"basket__itemtitle\"\n      ><span class=\"basket__itemname\">").concat(item.title, "</span>\n      <span class=\"basket__itemprice\">").concat(utility.price_comma(String(item.price)), "</span>\n      <span class=\"outofstockmessge noshow\">OUT OF STOCK</span>\n    </span>\n    <span class=\"basket__itemNo\"><div class=\"basket__itemNo__increase\"><img src=\"./Assets/Img/arrow-up-2.svg\"  data-product_id=").concat(item.id, " alt=\"Item_Increase\" /></div\n      ><span class=\"basket__itemNo__no\">").concat(item.qty, "</span\n      ><div class=\"basket__itemNo__decrease\" \n        ><img src=\"./Assets/Img/arrow-down-1.svg\" data-product_id=").concat(item.id, " alt=\"Item_Decrease\" /></div\n    ></span>\n    <div class=\"basket__itemdelete\" data-product_id=").concat(item.id, " onclick=deletefunc(this)\n      ><img src=\"./Assets/Img/trash.svg\" alt=\"\"\n    /></div>\n    <span class=\"basket__totalrow\">").concat(utility.price_comma(String(item.price * item.qty)), "</span>\n  </li>");
      });
      return result;
    }
  }, {
    key: "noOfProduct",
    value: function noOfProduct() {
      var basketitems = utility.readfromlocalstorage("basket");
      var result = 0;
      basketitems.forEach(function (i) {
        result = result + 1;
      });
      return result;
    }
  }, {
    key: "AddRemoveProduct",
    value: function AddRemoveProduct(productsInBasket, e) {
      var pInBasket = productsInBasket.findIndex(function (item) {
        return item.id == e.target.dataset.product_id;
      });
      var allProducts = utility.readfromlocalstorage("Products");
      var findproductIndex = allProducts.findIndex(function (item) {
        return item.id == e.target.dataset.product_id;
      });
      var p = new Product({
        title: allProducts[findproductIndex].title,
        price: allProducts[findproductIndex].price
      });
      p.id = allProducts[findproductIndex].id;
      allProducts[findproductIndex].category.forEach(function (item) {
        p.category.push({
          id: item.value,
          text: item.text
        });
      });
      console.log(allProducts[findproductIndex].category);
      var imgSrcBasket = "".concat(allProducts[findproductIndex].img.split(".")[1], "_small.png");
      p.img_s = imgSrcBasket;
      p.SetUnitsInStock = allProducts[findproductIndex].UnitInStock;
      if (productsInBasket[pInBasket] != undefined) {
        // console.log(productsInBasket[pInBasket].qty);
        p.qty = productsInBasket[pInBasket].qty;
      }
      var newStockStatus = p.CheckProductAvailable(e);
      if (newStockStatus != "OUT OF STOCK") {
        allProducts[findproductIndex].UnitInStock = newStockStatus.GetUnitsInStock;
        utility.addRemoveTotally("Products", allProducts);
        if (pInBasket < 0) {
          var title = newStockStatus.title,
            id = newStockStatus.id,
            price = newStockStatus.price,
            qty = newStockStatus.qty,
            img_s = newStockStatus.img_s,
            category = newStockStatus.category;
          utility.writetolocalstorage("basket", {
            title: title,
            id: id,
            price: price,
            qty: qty,
            img_s: img_s,
            category: category
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
  }, {
    key: "increase_decreaseproduct",
    value: function increase_decreaseproduct(products, basket, e) {
      var pInProducts = products.findIndex(function (item) {
        if (e.target != undefined) {
          return item.id == e.target.dataset.product_id;
        } else {
          return item.id == e.dataset.product_id;
        }
      });
      var pInBasket = basket.findIndex(function (item) {
        if (e.target != undefined) {
          return item.id == e.target.dataset.product_id;
        } else {
          return item.id == e.dataset.product_id;
        }
      });
      var p = new Product({
        title: products[pInProducts].title,
        price: products[pInProducts].price
      });
      p.SetUnitsInStock = products[pInProducts].UnitInStock;
      p.qty = basket[pInBasket].qty;
      var newUnitAndQTY = p.CheckProductAvailable(e);
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
        basket[pInBasket].totalRow = basket[pInBasket].qty * basket[pInBasket].price;
        utility.addRemoveTotally("basket", basket);
        var liID = document.getElementById("".concat(e.target.dataset.product_id));
        var newQTY = liID.querySelector(".basket__itemNo__no");
        var newTotalRow = liID.querySelector(".basket__totalrow");
        newQTY.innerHTML = basket[pInBasket].qty;
        newTotalRow.innerHTML = utility.price_comma(String(basket[pInBasket].totalRow));
      }
    }
  }]);
}();
function _total() {
  return this.products.reduce(function (acc, cur) {
    return Number(acc) + Number(cur.price * cur.qty);
  }, 0);
}
var utility = /*#__PURE__*/function () {
  function utility() {
    _classCallCheck(this, utility);
  }
  return _createClass(utility, null, [{
    key: "readfromlocalstorage",
    value: function readfromlocalstorage(rowname) {
      var result = JSON.parse(localStorage.getItem(rowname)) || [];
      // console.log(result);
      return result;
    }
  }, {
    key: "writetolocalstorage",
    value: function writetolocalstorage(rowname, object) {
      var result = this.readfromlocalstorage(rowname);
      result.push(object);
      localStorage.setItem(rowname, JSON.stringify(result));
    }
  }, {
    key: "Dynamic_Content",
    value: function Dynamic_Content(productid) {
      var products = this.readfromlocalstorage("Products");
      var basket = this.readfromlocalstorage("basket");
      var product = products.find(function (i) {
        return i.id == productid;
      });
      if (product.UnitInStock < 1) {
        return ["OUT OF STOCK", "buttondisable"];
      }
      if (basket.findIndex(function (i) {
        return productid == i.id;
      }) >= 0) {
        return ["Added", "button2"];
      } else {
        return ["Add To Cart", "button2"];
      }
    }
  }, {
    key: "addRemoveTotally",
    value: function addRemoveTotally(item, collection) {
      var _this = this;
      localStorage.removeItem(item);
      collection.forEach(function (i) {
        _this.writetolocalstorage(item, i);
      });
    }
  }, {
    key: "addActionToclass",
    value: function addActionToclass(className) {
      var result = 0;
      if (className == ".product__detail--btn") {
        var addBTNArray = document.querySelectorAll(className);
        addBTNArray.forEach(function (item) {
          item.addEventListener("click", function (e) {
            var producstInBasket = utility.readfromlocalstorage("basket");
            console.log(producstInBasket);
            Basket.AddRemoveProduct(producstInBasket, e);
          });
        });
      } else if (className == ".product__detail--btn__edit") {
        var editbtn = document.querySelectorAll(".product__detail--btn__edit");
        editbtn.forEach(function (item) {
          item.addEventListener("click", function (e) {
            document.querySelector(".modal.addproduct--form").classList.remove("modal--deactive");
            var editBtn = document.querySelector(".editproduct");
            editBtn.style.display = "inline";
            addProductBTN.style.display = "none";
            var products = utility.readfromlocalstorage("Products");
            var mustBeEditIndex = products.findIndex(function (item) {
              return item.id == e.target.dataset.product_id;
            });
            var p = new Product({
              title: products[mustBeEditIndex].title,
              price: products[mustBeEditIndex].price
            });
            p.SetUnitsInStock = products[mustBeEditIndex].UnitInStock;
            p.SetImgSource = products[mustBeEditIndex].img;
            p.id = products[mustBeEditIndex].id;
            var getCatFromDropdown = document.querySelector("#categorydropdown");
            console.log(getCatFromDropdown.options.selectedIndex);
            getCatFromDropdown.options.selectedIndex = products[mustBeEditIndex].category[0].value;
            productName.value = p.title;
            productid.value = p.id;
            productPrice.value = p.price;
            productimg.value = p.GetImgSource;
            unitinstock.value = p.GetUnitsInStock;
          });
        });
      }
    }
  }, {
    key: "price_comma",
    value: function price_comma(price) {
      var result;
      if (price.length <= 3) {
        result = price;
        return result;
      }
      var priceLength = String(price.length);
      var divided_By3 = Math.floor(priceLength / 3);
      var remain_By3 = priceLength % 3;
      if (remain_By3 == 0) {
        divided_By3 = divided_By3 - 1;
      }
      var d = _toConsumableArray(price);
      var c = d.length;
      for (var i = divided_By3; i > 0; i--) {
        c = c - 3;
        d.splice(c, 0, ",");
      }
      result = d.join("");
      return result;
    }
  }, {
    key: "searchfunc",
    value: function searchfunc(products, searchkey) {
      console.log(products);
      var result = [];
      products.forEach(function (item) {
        if (item.title.toLowerCase().includes(searchkey.toLowerCase())) {
          result.push(item);
        }
      });
      return result;
    }
  }]);
}(); //function
function increaseAction(products, basketinstance) {
  var increaseBasketItem = document.querySelectorAll(".basket__itemNo__increase");
  increaseBasketItem.forEach(function (item) {
    item.addEventListener("click", function (e) {
      var result = Basket.increase_decreaseproduct(products, basketinstance.products, e);
      if (result == "OUT OF STOCK") {
        var outofstockRaise = document.getElementById("".concat(e.target.dataset.product_id));
        outofstockRaise.querySelector(".outofstockmessge").classList.remove("noshow");
      } else {
        document.querySelector(".basket__total").innerHTML = "Payable: ".concat(utility.price_comma(String(basketinstance.basketTotal)));
      }
    });
  });
}
function decreaseAction(products, basketinstance) {
  var decreaseBasketItem = document.querySelectorAll(".basket__itemNo__decrease");
  decreaseBasketItem.forEach(function (item) {
    item.addEventListener("click", function (e) {
      var result = Basket.increase_decreaseproduct(products, basketinstance.products, e);
      if (result != "OUT OF STOCK") {
        var clearoutofstockRaise = document.getElementById("".concat(e.target.dataset.product_id));
        clearoutofstockRaise.querySelector(".outofstockmessge").classList.add("noshow");
      }
      document.querySelector(".basket__total").innerHTML = "Payable: ".concat(utility.price_comma(String(basketinstance.basketTotal)));
    });
  });
}
function deletefunc(e) {
  var products = utility.readfromlocalstorage("Products");
  var basket = utility.readfromlocalstorage("basket");
  var b = new Basket();
  basket.forEach(function (item) {
    item.totalRow = item.qty * item.price;
    b.products.push(item);
  });
  Basket.increase_decreaseproduct(products, b.products, e);
  basket__items.innerHTML = "";
  var productsInBasketInDOM = Basket.addItemsInBasketToDOM();
  basket__items.innerHTML = productsInBasketInDOM;
  document.querySelector(".basket__total").innerHTML = "Payable: ".concat(utility.price_comma(String(b.basketTotal)));
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
var a = {};
a.id = "j";
a.value = "p";
console.log(a);
a.id = "k";
a.value = "l";
console.log(a);