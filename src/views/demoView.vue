<template>
  <!--聊天界面-->
  <div class="messagesBox-BigRight-down80">
    <div class="showHisMsgs">
      <span @click="getTalkHistorys">{{ messagesHisMsgs }}</span>
    </div>
    <!--聊天消息数据-->
    <div class="messagesBox-BigRight-down80-contain" id="msg_display">
      <!--左消息-->
      <ul>
        <li
          class="tal"
          v-for="(item, index) in showMesDatas"
          @contextmenu.prevent="rightMessageClick(item.mid, item.uid)"
          @click="downLownFiles($event, item.url)"
          :key="index"
        >
          <!--头像-->
          <div
            v-show="item.type != '99'"
            :class="item.uid === user.userId ? 'RightmsgAvaterBox' : 'LeftmsgAvaterBox'"
          >
            <p class="LeftmsgAvaterText">{{ item.una.slice(0, 1) }}</p>
          </div>
          <!--用户名、时间-->
          <div v-show="item.type != '99'" class="msgTimgAndName">
            <div v-if="item.uid === user.userId">
              <div class="RightmsgTimeText">
                <span class="msgTime"> {{ CurentTime(item.time) }} </span>
                <span class="msgUser">{{ item.una }} </span>
                <!--<div class="msgAvaterBox">
                                    <p class="LeftmsgAvaterText">{{item.una.slice(0,1)}}</p>
                                </div>-->
              </div>
            </div>
            <div v-else>
              <div class="LeftmsgTimeText">
                <!--   <div class="msgAvaterBox">
                                    <p class="LeftmsgAvaterText">{{item.una.slice(0,1)}}</p>
                                </div>-->
                <span class="msgUser">{{ item.una }} </span>
                <span class="msgTime"> {{ CurentTime(item.time) }} </span>
              </div>
            </div>
          </div>
          <!--消息-->
          <div
            :id="'msg' + item.mid"
            @click="handelBackEvent($event, item.mid)"
            :class="item.uid === user.userId ? 'RightmsgBoxOut' : 'LeftmsgBoxOut'"
          >
            <div v-html="item.temporaryMes"></div>
            <div v-html="backMsghtml"></div>
          </div>
        </li>
      </ul>
    </div>
    <!--撤回消息-->
    <div v-show="withdrawMessageShow === true">
      <div class="withdrawMessageStyle">
        <span @click="withdrawMessage" class="cursorText">撤回</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //消息-聊天右侧聊天界面样式
  data() {
    return {
      messagesBoxSyle: {
        minWidth: '75%',
        minHeight: '80vh'
        // 'background-color': ' #b8e026'
      },
      //聊天或者文件
      messagesOrFiles: 'messages',
      messagesOrFilesActiveIndex: 'messages',
      messagesSelectHanderMenu: 'messagesSelectHanderMenu', //选中文件样式
      messagesNoSelectHanderMenu: 'messagesNoSelectHanderMenu', //选中文件样式
      //展开按钮定位
      messagesUnfoldSyle: {
        width: '35px',
        height: '80px',
        backgroundColor: '#DADADA',
        borderRadius: '10px 0 0 10px',
        position: 'absolute',
        top: '50%',
        right: '19%',
        'z-index': '100',
        cursor: 'pointer',
        transform: 'translateY(-50%)'
      },
      //发送按钮样式
      messagesBoxBigRightBotton: {
        position: 'absolute',
        bottom: '6%',
        right: '20%'
      }
    }
  }
}
</script>

<style>
.LeftmsgAvaterBox {
  width: 52px;
  height: 51px;
  background-color: #5a64c1;
  border-radius: 50%;
  float: left;
}
.RightmsgAvaterBox {
  width: 52px;
  height: 51px;
  background-color: #5a64c1;
  border-radius: 50%;
  float: right;
}
.LeftmsgBoxOut {
  text-align: left;
}
.RightmsgBoxOut {
  text-align: right;
}
</style>
