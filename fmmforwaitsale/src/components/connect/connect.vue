<template>
  <div class="contect">
    <router-link class="feedback clear" tag="div" to="/retroaction">
      <span>意见反馈</span>
      <span></span>
    </router-link>
    <a class="contact clear" href="tel:4008527111">
      <span>联系客服</span>
      <span></span>
    </a>
  </div>
</template>
<script>
export default {

}
</script>
<style>
.feedback,
.contact {
  display: block;
  width: 7.5rem;
  /*margin-top: .25rem;*/
  height: .85rem;
  background: #fff;
  border-bottom: 1px solid #f8f8f8;
  overflow: hidden;
}

.feedback span,
.contact span {
  display: block;
}

.feedback span:nth-child(1),
.contact span:nth-child(1) {
  float: left;
  margin-left: .3rem;
  font-size: .34rem;
  color: #333;
  margin-top: .2rem;
}

.feedback span:nth-child(2),
.contact span:nth-child(2) {
  float: right;
  margin-right: .3rem;
  width: .23rem;
  height: .27rem;
  background: url(./next_my.png) 0 0 no-repeat;
  background-size: 100% 100%;
  margin-top: .3rem;
}
</style>

