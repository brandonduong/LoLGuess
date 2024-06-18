// store.js
import { reactive } from "vue";
import http from "./http-common";
import type { StaticData, StaticSetsData } from "./interfaces";

export const store = reactive({
  staticTFTItemData: [] as StaticData[],
  staticTFTSetsData: {} as StaticSetsData,
  loading: true,
  async getStaticTFTData() {
    const staticData = window.localStorage.getItem("staticTFTData");
    // Today in UTC with no time
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      .toISOString()
      .split("T")[0];
    if (!staticData || JSON.parse(staticData).date !== today) {
      await http.dragon.get("/cdragon/tft/en_us.json").then((res) => {
        this.staticTFTItemData = res.data.items;
        this.staticTFTSetsData = res.data.sets;
      });

      //console.log(staticTFTAugmentData);
      localStorage.setItem(
        "staticTFTData",
        JSON.stringify({
          items: this.staticTFTItemData,
          sets: this.staticTFTSetsData,
          date: today,
        })
      );
    } else {
      const parsed = JSON.parse(staticData);
      //console.log(parsed);
      this.staticTFTItemData = parsed.items;
      this.staticTFTSetsData = parsed.sets;
    }
    this.loading = false;
  },
});
