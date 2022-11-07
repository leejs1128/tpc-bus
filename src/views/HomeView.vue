<template>
  <body style="height: 749px width: 694px">
    <div id="header" class="header"></div>

    <div class="search">
      <div class="search_inner">
        <div class="search_box">
          <div class="search_box_inner">
            <span class="search_text_box">
              <input
                type="search"
                name="search_query"
                value
                v-model="searchKeyword"
                maxlength="100"
                placeholder="버스번호 검색"
                title="검색어 입력"
                class="search_text"
                @keyup.enter="search"
              />
            </span>
            <span class="box_tool">
              <button type="button" class="box_button2">
                <span class="icon_delete"></span>
              </button>
              <button type="button" class="search_button" @click="search">
                <span class="icon_button"></span>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="search_busbox">
      <div class="search_busbox_list">
        <!-- <div class="search_list_bus_box"> -->

        <a href class="search_list_bus" v-if="isAfterSearch">
          <div class="search_list_bus_txt1">
            <!-- <img :src="require('@/assets/icon_bus_1.png')" /> -->
            <div v-for="n in 8" v-bind:key="n">
              <img
                v-if="n === Number(item.msgBody.itemList[0].routeType)"
                :class="`bus_routetype`"
                :src="require(`@/assets/icon_bus_${n}.png`)"
              />
            </div>
            <!-- <i
              v-if="item.msgBody.itemList[0].routeType === '3'"
              class="bus_routetype3"
            ></i>
            <i
              v-else-if="item.msgBody.itemList[0].routeType === '4'"
              class="bus_routetype4"
            ></i>
            <i
              v-else-if="item.msgBody.itemList[0].routeType === '1'"
              class="bus_routetype1"
            ></i> -->
            <!-- {{ item.msgBody && item.msgBody.itemList[0].routeType }} -->
            <strong>
              {{ item.msgBody && item.msgBody.itemList[0].busRouteNm }}</strong
            >
            <span class="real_time"> 실시간</span>
          </div>
          <p class="search_list_bus_txt2">
            <span class="txt">서울</span>
            <span class="search_list_bus_bar">|</span>
            {{ item.msgBody && item.msgBody.itemList[0].stStationNm }}
            <i class="icon_twin"></i>
            {{ item.msgBody && item.msgBody.itemList[0].edStationNm }}
          </p>
          <p class="search_list_bus_txt3">
            <span class="txt">첫차</span>
            <em class="search_list_bus_em">{{
              item.msgBody && getDate(item.msgBody.itemList[0].firstBusTm)
            }}</em>
            <span class="search_list_bus_bar">|</span>
            <span class="txt">막차</span>
            <em class="search_list_bus_em">{{
              item.msgBody && getDate(item.msgBody.itemList[0].lastBusTm)
            }}</em>
            <span class="search_list_bus_bar">|</span>
            <em class="search_list_bus_em"
              >{{ item.msgBody && item.msgBody.itemList[0].term
              }}<span>분 간격</span></em
            >
            <!-- </p>
        </a>
      </div>
    </div> -->
            <!-- </div> -->
          </p>
        </a>
        <div v-else class="search_error_msg">
          <span class="search_error_icon_msg"></span>
          최근 검색 기록이 없습니다.
        </div>
      </div>
    </div>
  </body>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      item: {},
      searchKeyword: '',
      isAfterSearch: false,
      type: 0
    }
  },
  setup() {},
  created() {
    // this.getList()
  },
  mounted() {},
  unmounted() {},
  watch: {
    searchKeyword() {
      console.log('watch')
      if (this.searchKeyword === '') {
        this.isAfterSearch = false
      }
    }
  },
  methods: {
    async getList() {
      const url = `https://cors-anywhere.herokuapp.com/http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?serviceKey=LNBl1jhu4absp9VCmqpNW4HHi7HGl8DjZaWTg%2FWMGVm0dUDoN5O%2BpayIzK7Z2eoX%2BbUEnVxlpTcDWECTSpkmQQ%3D%3D&resultType=json&strSrch=${this.searchKeyword}`
      console.log('url', url)
      const result = await this.$api(url)
      this.item = result
      console.log('item', this.item)
      console.log('value chec', result?.msgBody?.itemList[0])
      // strSrch = 요청받는 버스번호
      // busRouteId = 노선ID
      // busRouteNm = 노선명
      // routeType = (1:공항,2:마을,3:간선,4:지선,5:순환,6:광역,7:인천,8:경기,9:폐지,0:공용) 노선유형
      // stStaitionNm = 기점
      // edStationNm = 종점
      // term = 배차간격(분)
      // firstBusTm = 금일첫차시간
      // lastBusTm = 금일막차시간
    },
    async search() {
      await this.getList()
      this.isAfterSearch = true
      console.log('search')
    },
    getDate(date) {
      date.substring(8, 10)
      return date.substring(8, 10) + ':' + date.substring(10, 12)
    }
  }
}
</script>
<style scoped>
#header {
  text-align: center;
  color: #fff;
}

.search_text {
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 0;
  font-size: 17px;
  color: #000;
  font-weight: bold;
  line-height: 26px;
  background: none;
}

.search_text_box {
  display: table-cell;
  width: 100%;
  vertical-align: top;
}

.search_box_inner {
  display: table;
  width: 100%;
}

.search {
  position: relative;
  padding: 6px 6px 6px 6px;
  line-height: 14px;
  background-color: #00c73c;
}

.search_box {
  box-sizing: border-box;
  width: 100%;
  vertical-align: top;
  background-color: #fff;
}

.search_inner {
  display: table;
  width: 100%;
}

.box_tool {
  overflow: hidden;
  display: table-cell;
  font-size: 0;
  text-align: right;
  white-space: nowrap;
  vertical-align: top;
}

.box_button2 {
  overflow: hidden;
  position: relative;
  height: 42px;
  margin: 0;
  padding: 0;
  border: 0;
  line-height: 42px;
  vertical-align: top;
  background: none;
  display: none;
}

.icon_delete {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(transparent, transparent),
    url(https://ssl.pstatic.net/static/maps/m/sp_search.svg);
  background-size: 95px 91px;
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
  background-position: -34px -40px;
  margin: auto;
  color: transparent;
}
.search_button {
  display: inline-block;
  overflow: hidden;
  position: relative;
  height: 42px;
  width: 42px;
  margin: 0;
  padding: 0;
  border: 0;
  line-height: 42px;
  vertical-align: top;
  background: none;
}

.icon_button {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(transparent, transparent),
    url(https://ssl.pstatic.net/static/maps/m/sp_search.svg);
  background-size: 95px 91px;
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
  background-position: -6px -68px;
  margin: auto;
  color: transparent;
}

.search_busbox {
  display: table;
  width: 100%;
  box-sizing: border-box;
  height: 690px;
  margin: 5px 0;
  border-left: 5px solid #e9ecef;
  border-right: 5px solid #e9ecef;
  border-top: 5px solid #e9ecef;
  border-bottom: 5px solid #e9ecef;
  background: #fff;
}

.search_busbox_list {
  position: relative;
  display: table-cell;
  vertical-align: middle;
}

.search_error_msg {
  position: relative;
  height: -140px;
  overflow: hidden;
  color: #aeb3ba;
  font-size: 15px;
  text-align: center;
}
.search_error_icon_msg {
  display: block;
  margin: 0 auto 10px;
  width: 41px;
  height: 41px;
  background-position: 0 -27px;
  overflow: hidden;
  color: transparent;
  vertical-align: top;
  background-image: url(https://ssl.pstatic.net/static/maps/m/sp_map_v78compressed.png);
  background-size: 450px 420px;
  background-repeat: no-repeat;
  text-shadow: none;
}
.search_list_bus {
  position: relative;
  height: 700px;
  display: block;
  padding: 16px 14px 0;
  background-color: #fff;
  color: black;
  text-decoration: none;
  /* border 1px solid #e2e4c8; */
  margin-bottom: -1px;
}
.search_list_bus_txt1 {
  display: flex;
  overflow: hidden;
  padding-right: 50px;
  white-space: nowrap;
}
.search_list_bus_txt2 {
  display: flex;
  padding: 7px 0 0;
  font-size: 15px;
}
.search_list_bus_txt3 {
  display: flex;
  justify-content: flex-start;
  padding: 4px 0 12px;
  font-size: 14px;
}
.search_list_bus_bar {
  display: inline-block;
  overflow: hidden;
  width: 0;
  height: 12px;
  border-left: 1px solid #e5e4e4;
  margin: 3px 7px 0;
  color: transparent;
  vertical-align: top;
}
.search_list_bus_em {
  padding: 0 0 0 6px;
  color: blue;
  font-style: normal;
}
.icon_twin {
  width: 14px;
  height: 6px;
  margin: 6px 6px 0;
  background-position: -199px -138px;
  overflow: hidden;
  display: inline-block;
  color: transparent;
  vertical-align: top;
  background-image: url('https://ssl.pstatic.net/static/maps/m/sp_map_v78compressed.png');
  background-size: 450px 420px;
  background-repeat: no-repeat;
  text-shadow: none;
}
.real_time {
  position: absolute;
  top: 15px;
  right: 14px;
  font-size: 13px;
  line-height: 15px;
  color: #666;
  background: none;
}
.txt {
  color: rgb(102, 99, 99);
}
.bus_routetype {
  margin: 2px 8px 0 0;
  overflow: hidden;
  display: inline-block;
  width: 26px;
  height: 16px;
  background-size: auto 16px;
  background-repeat: no-repeat;
  color: transparent;
  vertical-align: top;
}
</style>
