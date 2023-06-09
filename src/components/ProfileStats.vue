<script setup lang="ts">
import { onMounted, ref, h } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { type GraphQLQuery } from "@aws-amplify/api";
import { type GetUserQuery } from "../API";
import { useAuthenticator } from "@aws-amplify/ui-vue";
const auth = useAuthenticator();

var staticProfileData = ref();
const loading = ref<boolean>(true);

async function getStaticProfileData() {
  const getUser = await API.graphql<GraphQLQuery<GetUserQuery>>({
    query: queries.getUser,
    variables: { id: auth.user.attributes.sub },
  });
  staticProfileData.value = getUser.data?.getUser;
}

onMounted(async () => {
  const staticData = window.localStorage.getItem("staticProfileData");
  if (staticData) {
    staticProfileData.value = JSON.parse(staticData);
  } else {
    await getStaticProfileData().then(() => {
      localStorage.setItem(
        "staticProfileData",
        JSON.stringify(staticProfileData.value)
      );
    });
  }
  loading.value = false;
});

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "4rem",
    margin: "5rem 0 4.5rem 0",
  },
  spin: true,
});
</script>
<template>
  <div v-if="!loading">
    <h3>{{ staticProfileData }}</h3>
  </div>
  <div v-else><a-spin :indicator="indicator"></a-spin></div>
</template>
<style scoped></style>
