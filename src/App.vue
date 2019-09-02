<template>
  <div class="app" id="app">
    <div class="app__bg">
      <div class="app__container">
        <router-view />
      </div>
      <app-footer />
    </div>
  </div>
</template>

<script>
import Footer from "./components/Footer/Footer";

export default {
  components: {
    "app-footer": Footer
  }
};
</script>

<style lang="scss">
// Reset CSS
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

body {
  font-family: "Roboto", sans-serif;
}

body,
.app {
  min-height: 100vh;
}
.app {
  display: flex;
  &__bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-image: url("./assets/bg.png");
    flex-direction: column;
    padding: 50px 10px;
    background-attachment: fixed;
  }
  &__container {
    width: 100%;
    max-width: 400px;
    text-align: center;
    color: white;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
  }
  @media screen and (max-width: 450px) {
    .app {
      &__bg {
        padding: 50px 20px;
      }
    }
  }
}
</style>
