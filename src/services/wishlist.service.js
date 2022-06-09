import { EventEmitter } from "events";

const KEY = "@wishlist";

const emitter = new EventEmitter();

export function addWishlistListener(listener) {
  emitter.addListener("change", listener);
}

export function removeWishlistListener(listener) {
  emitter.removeListener("change", listener);
}

export function addToWishlist(product) {
  let wishlist = localStorage.getItem(KEY);
  wishlist = wishlist ? JSON.parse(wishlist) : {};
  wishlist[product.id] = product;
  localStorage.setItem(KEY, JSON.stringify(wishlist));
  emitter.emit("change", Object.keys(wishlist).length);
}

export function removeFromWishlist(productId) {
  let wishlist = localStorage.getItem(KEY);
  wishlist = wishlist ? JSON.parse(wishlist) : {};
  delete wishlist[productId];
  localStorage.setItem(KEY, JSON.stringify(wishlist));
  emitter.emit("change", Object.keys(wishlist).length);
}

export function productInWishlist(productId) {
  let wishlist = localStorage.getItem(KEY);
  wishlist = wishlist ? JSON.parse(wishlist) : {};
  return !!wishlist[productId];
}

export function getWishlist() {
  let wishlist = localStorage.getItem(KEY);
  return wishlist ? JSON.parse(wishlist) : {};
}
