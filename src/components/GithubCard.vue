<script>
export default {
  name: "GithubCard",
  props: {
    username: {
      type: String,
      default: "",
      required: true,
    },
  },
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.getUserCard();
  },
  methods: {
    getUserCard() {
      this.username &&
        fetch(`https://api.github.com/users/${this.username}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            this.user = data;
            console.log(this.user);
          });
    },
  },
};
</script>

<template>
  <div class="githubCard">
    <div class="cardContainer">
      <div class="imageContainer">
        <img
          class="image"
          :src="user.avatar_url"
          :alt="user.name || user.login"
        />
      </div>
      <div class="detailsContainer">
        <div v-if="user.name" class="name">
          <a :href="user.html_url" target="blank">{{ user.name }}</a>
        </div>
        <div class="username">
          <a :href="user.html_url" target="blank">@{{ user.login }}</a>
        </div>
        <div v-if="user.bio" class="bio">{{ user.bio }}</div>
      </div>
      <div class="metricsContainer">
        <div class="metricsItem followers">
          {{ user.followers }}
          <label>Folowers</label>
        </div>
        <div class="metricsItem following">
          {{ user.following }}
          <label>Folowers</label>
        </div>
        <div class="metricsItem repositories">
          {{ user.public_repos }}
          <label>Public Repos</label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "./../styles/design" as *;

.githubCard {
  width: 400px;
  max-width: 90%;
  margin: 0 auto;
}

.cardContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $s-xxl;
  background: $c-mine-shaft;
  border-radius: $base-radius;
  overflow: hidden;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: calc(#{$s-xxl} + (#{$s-object} / 2));
    background: transparentize($c-aqua-marine, 0.5);
  }
}

.imageContainer {
  display: flex;
  justify-content: center;
}

.image {
  position: relative;
  z-index: $z-highlight;
  width: $s-object;
  height: $s-object;
  object-fit: cover;
  border-radius: 50%;
}

.detailsContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: $s-xl 0 0;
}

.name {
  font-size: $s-xl;
  a {
    color: $c-silver;
  }
}

.username {
  font-size: $s-l;
  a {
    color: darken($c-silver, 25%);
  }
}

.bio {
  max-width: 80%;
  margin-top: $s-xl;
  text-align: center;
}

.metricsContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: $s-l 0 0;
  margin: $s-xxl 0 0;
  border-top: 3px solid $c-brink-pink;
}

.metricsItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  & ~ .metricsItem {
    margin-left: $s-l;
  }
}
</style>
