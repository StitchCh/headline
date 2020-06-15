<template>
  <div class="abs bg-f c-6 flex-col app-roles">
    <div class="af-topbar flex-v-center" style="background: #fff;">
      <dock title="统计" color="#2088ff"/>
      <div class="flex-item"></div>
      <account/>
    </div>

    <div class="flex-item scroll-y relative" style="padding: 40px 0;">

      <div class="data_box">
        <div class="data_title">
          <h3>整体趋势</h3>
          <div>
            <span class="data_title_span" @click="topData.type = 1" :class="{data_titleon: topData.type == 1}">昨天</span>
            <span class="data_title_span" @click="topData.type = 2" :class="{data_titleon: topData.type == 2}">7天</span>
            <span class="data_title_span" @click="topData.type = 3" :class="{data_titleon: topData.type == 3}">30天</span>
            <vue-datepicker-local
              v-model="topData.time"
              format="YYYY-MM-DD"
              @confirm="topData.type = 4"
              show-buttons></vue-datepicker-local>
          </div>
        </div>


        <div v-if="top" class="data_item_box">

          <div class="data_item">
            <svg class="icon data_icon" viewBox="0 0 1024 1024" width="62" height="62" fill="#FFFFFF">
              <path d="M678.4 642.56c24.064-12.8 51.712-20.48 81.408-20.48 3.072 0 4.608-3.584 2.048-5.632-30.72-27.648-65.536-49.664-103.936-66.048-0.512 0-1.024-0.512-1.024-0.512 61.952-45.056 102.4-118.272 102.4-201.216 0-137.216-110.592-247.808-247.296-247.808S264.704 211.968 264.704 349.184c0 82.944 40.448 156.16 102.4 201.216-0.512 0-1.024 0.512-1.024 0.512-44.544 18.944-84.992 46.08-119.296 80.384-34.304 34.304-61.44 74.752-80.384 119.296-18.432 44.032-28.16 90.112-29.184 138.24 0 4.608 3.584 8.192 8.192 8.192H204.8c4.096 0 7.68-3.584 8.192-7.68 2.048-77.312 32.768-149.504 87.552-204.288 56.32-56.832 131.584-88.064 211.456-88.064 56.832 0 111.104 15.872 158.208 45.056 2.56 1.536 5.632 1.536 8.192 0.512zM512 521.216c-45.568 0-89.088-17.92-121.344-50.176-32.256-32.256-50.176-75.776-50.176-121.856s17.92-89.088 50.176-121.856c32.256-32.256 75.264-50.176 121.344-50.176s89.088 17.92 121.344 50.176c32.256 32.256 50.176 75.776 50.176 121.856S665.6 438.272 633.344 471.04c-32.256 32.256-75.264 50.176-121.344 50.176z m368.128 237.568h-83.968v-83.968c0-4.608-3.584-8.192-8.192-8.192H732.16c-4.608 0-8.192 3.584-8.192 8.192v83.968H640c-4.608 0-8.192 3.584-8.192 8.192v55.808c0 4.608 3.584 8.192 8.192 8.192h83.968v83.968c0 4.608 3.584 8.192 8.192 8.192h55.808c4.608 0 8.192-3.584 8.192-8.192v-83.968h83.968c4.608 0 8.192-3.584 8.192-8.192v-55.808c-0.512-4.608-4.096-8.192-8.192-8.192z" p-id="2847"></path>
            </svg>
            <p>新增用户</p>
            <p style="font-weight: bold;font-size: 24px;">{{ top.newUsers }}</p>
            <p>日均<span style="margin-left: 5px;margin-right: 10px;">{{ top.avgNewUsers }}</span></p>
          </div>

          <div class="data_item">
            <svg class="icon data_icon" viewBox="0 0 1024 1024" width="58" height="58" fill="#FFFFFF"><path d="M787.2 569.6c12.8 6.4 32 0 44.8-12.8 6.4-12.8 0-32-12.8-44.8-38.4-19.2-76.8-32-115.2-44.8 12.8-6.4 25.6-19.2 38.4-32 25.6-25.6 44.8-51.2 57.6-83.2 12.8-32 19.2-64 19.2-102.4 0-19.2 0-32-6.4-51.2C793.6 96 710.4 19.2 614.4 0h-57.6c-38.4 0-70.4 6.4-102.4 19.2-32 12.8-57.6 32-76.8 57.6-12.8 12.8-25.6 25.6-32 38.4-19.2 25.6-32 57.6-38.4 89.6-6.4 19.2-6.4 32-6.4 51.2 0 89.6 44.8 166.4 115.2 211.2-230.4 64-403.2 275.2-403.2 524.8 0 19.2 12.8 32 32 32s32-12.8 32-32C76.8 729.6 288 512 556.8 512c76.8 0 160 19.2 230.4 57.6zM364.8 256c0-108.8 83.2-192 192-192s192 83.2 192 192-83.2 192-192 192-192-83.2-192-192z" p-id="2100"></path><path d="M940.8 768H768c-12.8 0-25.6 6.4-25.6 19.2l-57.6 108.8-102.4-236.8c-6.4-12.8-19.2-19.2-25.6-19.2-12.8 0-25.6 6.4-32 19.2L473.6 768H313.6c-19.2 0-32 12.8-32 32s12.8 32 32 32h179.2c12.8 0 25.6-6.4 32-19.2l32-70.4 96 236.8c6.4 12.8 12.8 19.2 25.6 19.2s25.6-6.4 25.6-19.2l76.8-153.6h147.2c19.2 0 32-12.8 32-32s-6.4-25.6-19.2-25.6z" p-id="2101"></path></svg>
            <p>活跃用户</p>
            <p style="font-weight: bold;font-size: 24px;">{{ top.activeUsers }}</p>
            <p>日均<span style="margin-left: 5px;margin-right: 10px;">{{ top.avgActiveUsers }}</span></p>
          </div>

          <div class="data_item">
            <svg class="icon data_icon"  viewBox="0 0 1025 1024" width="58" height="58" fill="#FFFFFF"><path d="M730.2 882.82c-4.9-160.8-115.1-295.9-263.2-339.2 2.6-1.3 9.9-5.7 11-6.3 7.7-4.3 25.6-16.5 27.4-17.8 6.4-4.9 23.6-20.4 26.1-22.9 4.7-4.8 29.4-35.6 31.8-39.4 4.9-7.7 9.2-15.7 13.1-24 0.5-1.2 1.2-2.1 1.7-3.3 13.7-29.5 21.4-62.3 21.4-96.9 0-129-105-234-234-234h-0.4c-129 0-234 104.9-234 234 0 92.6 54.3 172.6 132.5 210.5C115.5 586.82 5.4 721.82 0.5 882.62c-0.1 0.8-0.5 1.4-0.5 2.2 0 0.5 0.2 0.8 0.3 1.2 0.2 4.5 1.3 8.7 3.2 12.7 5.2 10.7 15.9 18.2 28.6 18.2 13 0 24-7.8 29.1-18.8 1.4-3 1.8-6.2 2.3-9.6 0.2-1.3 0.7-2.4 0.7-3.7s-0.6-2.5-0.8-3.8c0-4.8 0.1-9.5-0.1-14.2-0.1-2.8 0.6-5.1 1.2-7.4h-0.8c9.5-83.9 53.7-157.5 117.6-206.5 1.2-0.7 2.4-1.1 3.6-1.9l0.6 0.6c37.7-28.5 82-48.6 130.2-57 0.8-0.1 1.7-0.2 2.5-0.4 7-1.1 14.1-2.1 21.3-2.7 6.3-0.5 12.7-0.8 19.1-0.9 2.3-0.1 4.4-0.3 6.7-0.3 10 0 20 0.7 29.8 1.7v-0.2c141.7 14 255.9 126.5 272 267.8h-0.8c0.6 2.3 1.3 4.6 1.2 7.4-0.2 4.8-0.1 9.5-0.1 14.2-0.2 1.3-0.8 2.5-0.8 3.8 0 1.3 0.5 2.4 0.7 3.7 0.4 3.3 0.9 6.6 2.3 9.6 5 11 16 18.8 29 18.8 12.7 0 23.5-7.5 28.7-18.2 1.8-3.9 3-8.1 3.1-12.7 0-0.4 0.2-0.8 0.2-1.2 0.1-0.8-0.3-1.4-0.4-2.2m-537-549.6c0-94.9 77.2-172.2 172.1-172.3 94.9 0.1 172.1 77.3 172.1 172.3 0 95-77.2 172.3-172.1 172.3-94.9 0-172.1-77.3-172.1-172.3m830.3 557.3c-4.8-160.8-115-295.9-263.1-339.2 78.2-37.9 132.4-117.8 132.4-210.5 0-128.7-104.6-233.5-233.2-234v0.6c-15.9 1.3-28.5 14.2-28.5 30.4s12.6 29.1 28.5 30.4v0.3c0.8 0 1.5 0.1 2.3 0.2h0.2c93.3 1.9 168.7 78.3 168.7 172.1 0 87.6-67.9 168.8-152.8 181v0.2c-7.7 1.3-14.9 4.4-20.3 9.5-7.6 7.2-12.5 17.2-12.5 28.5 0 12.1 5.8 22.5 14.4 29.7 6.7 5.7 15.2 9.5 24.6 9.5-0.1 0-0.1 0.1-0.2 0.1h0.5c7.2 0.7 14.3 1.6 21.3 2.8 0.8 0.1 1.7 0.2 2.5 0.3 48.2 8.4 92.5 28.5 130.2 57 0.2-0.2 0.5-0.4 0.6-0.6 1.1 0.8 2.4 1.3 3.6 1.9 63.9 49 108.1 122.6 117.6 206.5h-0.8c0.5 2.4 1.3 4.6 1.2 7.4-0.2 4.8-0.1 9.5-0.1 14.2-0.2 1.3-0.8 2.5-0.8 3.9 0 1.3 0.5 2.4 0.8 3.6 0.4 3.4 0.9 6.6 2.2 9.6 5 11 16.1 18.9 29.1 18.9 12.7 0 23.4-7.6 28.6-18.3 1.9-3.9 3-8.1 3.2-12.7 0-0.4 0.2-0.8 0.2-1.2 0.1-0.7-0.3-1.4-0.4-2.1M684 599.32h-0.1 0.1z" p-id="4245"></path></svg>
            <p>留存用户</p>
            <p style="font-weight: bold;font-size: 24px;">{{ top.retainedUsers }}</p>
            <p>日均<span style="margin-left: 5px;margin-right: 10px;">{{ top.newUsers }}</span></p>
          </div>

          <div class="data_item">
            <svg class="icon data_icon" viewBox="0 0 1024 1024" width="54" height="54" fill="#FFFFFF"><path d="M1003.18687 9.993784a51.197664 51.197664 0 0 0-53.245571-4.60779l-921.557954 460.778977a51.197664 51.197664 0 0 0-3.519839 89.723907L358.416288 756.007747V972.765858a51.261661 51.261661 0 0 0 74.108618 45.821909l198.262955-99.195474 162.040607 97.275562a51.709641 51.709641 0 0 0 47.805818 2.559883c15.423296-7.039679 26.238803-21.311028 29.054675-38.078263l153.592992-921.557954a51.06967 51.06967 0 0 0-20.095083-49.597737z m-222.069868 880.151843l-299.250347-179.447813 409.837301-484.457896-110.650951 663.905709zM460.811616 889.889639v-72.444695l65.916992 39.550196-65.916992 32.894499z m311.793774-681.376912L392.974711 657.260253 157.529453 516.082694l615.075937-307.569967z" p-id="5044"></path></svg>
            <p>推送量</p>
            <p style="font-weight: bold;font-size: 24px;">{{ top.pushedCount }}</p>
            <p>日均<span style="margin-left: 5px;margin-right: 10px;">{{ top.avgPushedCount }}</span></p>
          </div>

          <div class="data_item">
            <svg class="icon data_icon" viewBox="0 0 1024 1024" width="58" height="58" fill="#FFFFFF"><path d="M512 1024C229.376 1024 0 794.624 0 512S229.376 0 512 0s512 229.376 512 512-229.376 512-512 512z m0-960.512C264.192 63.488 63.488 264.192 63.488 512c0 247.808 200.704 448.512 448.512 448.512S960.512 759.808 960.512 512c0-247.808-200.704-448.512-448.512-448.512z m272.384 512H512c-10.24 0-18.432-4.096-24.576-12.288-4.096-6.144-8.192-12.288-8.192-20.48V223.232c0-18.432 14.336-30.72 32.768-30.72 18.432 0 32.768 14.336 32.768 30.72V512h239.616c18.432 0 30.72 14.336 30.72 32.768 0 16.384-12.288 30.72-30.72 30.72z" p-id="5545"></path></svg>
            <p>使用时长</p>
            <p style="font-weight: bold;font-size: 24px;">{{ top.duration }}</p>
            <p>日均<span style="margin-left: 5px;margin-right: 10px;">{{ top.avgDuration }}</span></p>
          </div>

          <div class="data_item">
            <svg class="icon data_icon" viewBox="0 0 1024 1024" width="58" height="58" fill="#FFFFFF"><path d="M776 187.2c92.8 76.8 152 192 152 321.6 0 230.4-185.6 416-416 416S96 739.2 96 508.8c0-129.6 59.2-244.8 152-321.6 6.4-4.8 12.8-8 20.8-8 17.6 0 32 14.4 32 32 0 11.2-6.4 20.8-14.4 27.2-78.4 64-128 161.6-128 272 0 195.2 156.8 352 352 352s352-156.8 352-352c0-110.4-51.2-209.6-131.2-275.2-6.4-6.4-9.6-14.4-9.6-22.4 0-17.6 14.4-32 32-32 9.6-1.6 17.6 1.6 22.4 6.4z" p-id="6577"></path><path d="M512 99.2c17.6 0 32 14.4 32 32v448c0 17.6-14.4 32-32 32s-32-14.4-32-32v-448c0-17.6 14.4-32 32-32z" p-id="6578"></path></svg>
            <p>启动次数</p>
            <p style="font-weight: bold;font-size: 24px;">{{ top.startup }}</p>
            <p>日均<span style="margin-left: 5px;margin-right: 10px;">{{ top.avgStartup }}</span></p>
          </div>

          <div class="data_item">
            <svg class="icon data_icon" viewBox="0 0 1024 1024" width="52" height="52" fill="#FFFFFF"><path d="M913.351882 1024H145.209659C68.125215 1024 5.547437 961.564444 5.547437 884.337778V251.164444c0-77.084444 62.577778-139.662222 139.662222-139.662222h87.324445c19.342222 0 34.986667 15.644444 34.986666 34.986667 0 19.342222-15.644444 34.986667-34.986666 34.986667H127.716326c-28.871111 0-52.337778 23.466667-52.337778 52.337777v633.173334c0 48.213333 39.111111 87.324444 87.324445 87.324444h698.311111c48.213333 0 87.324444-39.111111 87.324444-87.324444V233.671111c0-28.871111-23.466667-52.337778-52.337778-52.337778h-104.675555c-19.342222 0-34.986667-15.644444-34.986667-34.986666 0-19.342222 15.644444-34.986667 34.986667-34.986667h87.324444c77.084444 0 139.662222 62.577778 139.662223 139.662222v668.16c-0.142222 57.884444-47.075556 104.817778-104.96 104.817778M327.68077 571.591111c4.835556-4.835556 12.373333-4.977778 17.92 0.568889l132.266667 135.253333V13.084444c0-7.253333 5.973333-13.084444 13.084445-13.084444L534.614104 0.142222c7.253333 0 13.084444 5.973333 13.084444 13.084445v694.328889l132.551111-134.257778c5.831111-5.831111 12.231111-6.684444 17.066667-1.706667l35.84 36.693333c4.835556 4.977778 6.826667 10.951111-1.991111 19.626667L547.271882 813.937778v0.142222c-6.257778 7.537778-11.804444 11.662222-13.084445 13.084444-13.084444 13.084444-29.582222 13.937778-43.662222-0.142222-2.275556-2.275556-7.537778-7.111111-13.084445-13.084444v-0.284445L292.836326 624.782222c-6.542222-6.542222-4.835556-12.8 0-17.777778l34.844444-35.413333m0 0" p-id="7955"></path></svg>
            <p>总下载量</p>
            <p style="font-weight: bold;font-size: 24px;">{{ top.download }}</p>
            <p>日均<span style="margin-left: 5px;margin-right: 10px;">{{ top.newUsers }}</span></p>
          </div>

          <div class="data_item">
            <svg class="icon data_icon" viewBox="0 0 1024 1024" width="58" height="58" fill="#FFFFFF"><path d="M940.8 243.2l-6.4-6.4-121.6-134.4c-19.2-12.8-38.4-19.2-64-19.2H307.2c-25.6 0-51.2 6.4-64 25.6l-128 128-6.4 6.4c-38.4 19.2-57.6 51.2-57.6 89.6v531.2c0 51.2 44.8 96 96 96H896c51.2 0 96-44.8 96-96V332.8c0-38.4-19.2-70.4-51.2-89.6zM281.6 153.6c6.4-6.4 12.8-6.4 19.2-6.4h441.6c6.4 0 12.8 0 19.2 6.4l76.8 83.2h-640l83.2-83.2z m646.4 710.4c0 19.2-12.8 32-32 32H147.2c-19.2 0-32-12.8-32-32V332.8c0-19.2 12.8-32 32-32H896c19.2 0 32 12.8 32 32v531.2z" p-id="8749"></path><path d="M710.4 537.6c-12.8-12.8-32-12.8-44.8 0L556.8 640V396.8c0-19.2-12.8-32-32-32s-32 12.8-32 32V640L377.6 537.6c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l160 153.6c6.4 6.4 12.8 12.8 25.6 12.8s19.2-6.4 25.6-12.8L704 582.4c19.2-12.8 19.2-32 6.4-44.8z" p-id="8750"></path></svg>
            <p>总安装量</p>
            <p style="font-weight: bold;font-size: 24px;">{{ top.install }}</p>
            <p>日均<span style="margin-left: 5px;margin-right: 10px;">{{ top.newUsers }}</span></p>
          </div>

          <div class="data_item">
            <svg class="icon data_icon" viewBox="0 0 1024 1024" width="58" height="58" fill="#FFFFFF"><path d="M819.097634 1023.863512h-614.195268a136.487837 136.487837 0 0 1-136.487838-136.487837V137.375008a136.487837 136.487837 0 0 1 136.487838-136.419593h438.944885a36.988204 36.988204 0 0 1 33.43952 9.690636l266.287771 266.014795a36.851716 36.851716 0 0 1 10.441319 21.019127 32.757081 32.757081 0 0 1 1.569611 10.236588v579.595602a136.283106 136.283106 0 0 1-136.487838 136.419593z m-136.487837-901.502166V273.658114h151.501499L682.609797 122.293102z m204.731756 219.540687H648.487837a34.121959 34.121959 0 0 1-34.121959-34.12196V69.062846h-409.463512a68.243919 68.243919 0 0 0-68.243919 68.243918v750.137155a68.107431 68.107431 0 0 0 68.243919 68.175674h614.195268a68.243919 68.243919 0 0 0 68.243919-68.243918V341.902033z" p-id="9074"></path><path d="M273.146285 443.585472l341.219593 0 0 68.243918-341.219593 0 0-68.243918Z" p-id="9075"></path><path d="M273.146285 648.317228l477.70743 0 0 68.243918-477.70743 0 0-68.243918Z" p-id="9076"></path></svg>
            <p>发稿量</p>
            <p style="font-weight: bold;font-size: 24px;">{{ top.sended }}</p>
            <p>日均<span style="margin-left: 5px;margin-right: 10px;">{{ top.avgSended }}</span></p>
          </div>

          <div class="data_item">
            <svg class="icon data_icon" viewBox="0 0 1037 1024" width="58" height="58" fill="#FFFFFF"><path d="M30.419857 409.145618h216.817378c13.36036-1.516848 84.033818-11.081727 137.531271-48.194087 30.890371-21.433038 56.224194-40.721875 72.918483-60.815068 14.39101-17.3194 22.551069-36.04138 22.551069-59.105533V106.454935l0.356246-2.498205C480.636874 103.663218 493.226487 0 612.609358 0c44.380682 0 74.330025 12.719564 94.497155 30.233892C740.105236 58.892681 744.980658 98.317282 744.980658 118.963889v217.740482h146.648042l0.714733 0.120989c0.405538 0.008962 145.075181 0.105306 145.075181 165.784523 0 55.778326-28.911971 139.657547-66.250626 223.503159-60.622381 136.117488-146.737664 276.821369-163.456598 290.757549l-8.549913 7.129409H353.7325v-60.839714h421.32073c22.810972-30.670798 89.222917-146.072223 140.74197-261.758196 34.257908-76.917853 60.7837-152.294211 60.7837-198.792207 0-99.800522-76.772217-104.911201-84.9502-105.171104v0.105305h-207.487756V118.963889c0-10.481262-2.157643-30.218208-16.718934-42.863835-10.172067-8.834462-27.117296-15.260341-54.812652-15.26034-57.911323 0-69.56887 39.984736-71.531587 49.596667v130.594549c0 38.647132-13.32003 69.577833-36.812127 97.846768-21.19554 25.504105-50.221779 47.822157-85.037581 71.977454-48.216492 33.455793-107.142782 48.469674-141.075811 54.772323v558.363563H0V409.145618h30.419857z m186.892681 60.839713H60.841954v493.165993h156.470584v-493.165993z" p-id="15021"></path></svg>
            <p>点赞量</p>
            <p style="font-weight: bold;font-size: 24px;">{{ top.digg }}</p>
            <p>日均<span style="margin-left: 5px;margin-right: 10px;">{{ top.avgDigg }}</span></p>
          </div>

          <div class="data_item">
            <svg class="icon data_icon" viewBox="0 0 1024 1024" width="58" height="58" fill="#FFFFFF"><path d="M512 249.422769c168.369231 0 306.372923 88.615385 407.118769 222.838154 18.116923 16.541538 24.576 21.976615 24.576 39.739077s-6.459077 23.197538-24.576 39.739077c-100.745846 134.183385-238.749538 222.838154-407.118769 222.838154-171.677538-5.907692-303.222154-89.521231-407.158154-222.916923C86.409846 534.528 83.416615 528.226462 80.305231 512c3.111385-16.226462 6.104615-22.488615 24.536615-39.699692C208.777846 338.904615 340.322462 255.291077 512 249.422769M512 707.741538c108.110769 0 195.741538-87.630769 195.741538-195.741538 0-108.071385-87.630769-195.741538-195.741538-195.741538-108.110769 0-195.741538 87.670154-195.741538 195.741538C316.258462 620.110769 403.889231 707.741538 512 707.741538M512 170.653538c-0.905846 0-1.811692 0-2.678154 0.039385-181.838769 6.222769-337.565538 89.836308-462.926769 248.516923-26.033231 25.324308-37.218462 45.646769-43.441231 77.942154-1.851077 9.806769-1.851077 19.889231 0 29.696 6.222769 32.374154 17.408 52.736 43.480615 77.942154 125.361231 158.601846 281.048615 242.215385 462.848 248.516923 0.905846 0.039385 1.811692 0.039385 2.717538 0.039385 180.460308 0 341.307077-85.858462 465.604923-248.398769 20.913231-19.416615 44.859077-45.056 44.859077-92.947692 0-48.797538-24.812308-74.476308-44.898462-93.026462C853.307077 256.472615 692.499692 170.653538 512 170.653538L512 170.653538zM512 628.972308c-64.512 0-116.972308-52.460308-116.972308-116.972308s52.460308-116.972308 116.972308-116.972308 116.972308 52.460308 116.972308 116.972308S576.512 628.972308 512 628.972308L512 628.972308z" p-id="15791"></path></svg>
            <p>阅读量</p>
            <p style="font-weight: bold;font-size: 24px;">{{ top.pv }}</p>
            <p>日均<span style="margin-left: 5px;margin-right: 10px;">{{ top.avgPv }}</span></p>
          </div>

          <div class="data_item">
            <svg class="icon data_icon" viewBox="0 0 1024 1024" width="52" height="52" fill="#FFFFFF"><path d="M910.180785 1024H113.777216A113.771796 113.771796 0 0 1 0.00542 910.228204V227.597431a113.771796 113.771796 0 0 1 113.771796-113.772796h284.429989a28.442699 28.442699 0 0 1 0 56.886398H113.777216a56.886398 56.886398 0 0 0-56.885398 56.886398v682.630773a56.886398 56.886398 0 0 0 56.885398 56.885398h796.403569a56.886398 56.886398 0 0 0 56.885398-56.885398V540.469119a28.442699 28.442699 0 1 1 56.886398 0v369.759085A113.771796 113.771796 0 0 1 910.180785 1024z m105.038888-819.441325L846.44046 361.677011a31.287669 31.287669 0 0 1-42.180554 0 26.45172 26.45172 0 0 1 0-39.279584L935.095521 200.604716A568.233985 568.233985 0 0 0 405.28913 682.683613h-1.222987c0 0.625993 0.369996 1.137988 0.369996 1.791981a28.442699 28.442699 0 0 1-56.886398 0c0-0.625993 0.312997-1.165988 0.369996-1.791981A625.745376 625.745376 0 0 1 908.985798 144.941306L804.258906 47.440338a26.45172 26.45172 0 0 1 0-39.279584 31.287669 31.287669 0 0 1 42.180554 0l145.40046 135.331567 3.669962 0.198998v3.241966l19.709791 18.374805a26.42372 26.42372 0 0 1 0 39.250585z" p-id="17763"></path></svg>
            <p>分享量</p>
            <p style="font-weight: bold;font-size: 24px;">{{ top.share }}</p>
            <p>日均<span style="margin-left: 5px;margin-right: 10px;">{{ top.avgShare }}</span></p>
          </div>

        </div>

        <div v-else class="data_item_box load_box">
          <loading></loading>
        </div>

      </div>

      <div class="box_line"></div>

      <div class="data_box">
        <vue-datepicker-local
          v-model="dateRange"
          format="YYYY-MM-DD"
          @confirm="getTopLineData"
          show-buttons></vue-datepicker-local>

        <div class="data_title1" style="padding-top: 20px;">
          <span class="data_title_span" @click="trendType = 'newUsers'" :class="{ data_titleon: trendType == 'newUsers'}">{{ trendConfig['newUsers'] }}</span>
          <span class="data_title_span" @click="trendType = 'activeUsers'" :class="{ data_titleon: trendType == 'activeUsers'}">{{ trendConfig['activeUsers'] }}</span>
          <span class="data_title_span" @click="trendType = 'retainedUsers'" :class="{ data_titleon: trendType == 'retainedUsers'}">{{ trendConfig['retainedUsers'] }}</span>
          <span class="data_title_span" @click="trendType = 'duration'" :class="{ data_titleon: trendType == 'duration'}">{{ trendConfig['duration'] }}</span>
          <span class="data_title_span" @click="trendType = 'startup'" :class="{ data_titleon: trendType == 'startup'}">{{ trendConfig['startup'] }}</span>
          <span class="data_title_span" @click="trendType = 'download'" :class="{ data_titleon: trendType == 'download'}">{{ trendConfig['download'] }}</span>
          <span class="data_title_span" @click="trendType = 'install'" :class="{ data_titleon: trendType == 'install'}">{{ trendConfig['install'] }}</span>
        </div>

        <div v-show="showEcharts" ref="echarts" style="height: 400px;"></div>

        <div v-show="!showEcharts" style="height: 400px;" class="load_box">
          <loading></loading>
        </div>
      </div>

      <div class="box_line"></div>

      <div class="data_box">
        <div class="data_title">
          <h3>渠道</h3>
        </div>

        <div v-show="showEcharts1" ref="echarts1" style="height: 400px;"></div>

        <div v-show="!showEcharts1" style="height: 400px;" class="load_box">
          <loading></loading>
        </div>
      </div>

      <div class="box_line"></div>

      <div class="data_box">
        <div class="data_title">
          <h3>访问量</h3>

          <div>
            <span class="data_title_span" @click="browseSearch.type = 1" :class="{data_titleon: browseSearch.type == 1}">昨天</span>
            <span class="data_title_span" @click="browseSearch.type = 2" :class="{data_titleon: browseSearch.type == 2}">7天</span>
            <span class="data_title_span" @click="browseSearch.type = 3" :class="{data_titleon: browseSearch.type == 3}">30天</span>
            <vue-datepicker-local
              v-model="browseSearch.time"
              format="YYYY-MM-DD"
              @confirm="browseSearch.type = 4"
              show-buttons></vue-datepicker-local>
            <!--<span class="data_title_span">数据导出</span>-->
          </div>
        </div>

        <div v-if="browseData" class="flex">

          <div class="pie_lbox">

            <div class="pie_item">
              <div>阅览次数</div>
              <div>{{ browseData.pv }}</div>
              <div>
                同比 {{ parseInt(browseData.pvRatio) }}%
                <i v-if="browseData.pvRatioTrend == 1" style="color: rgb(255, 174, 169);" class="icon">arrow_upward</i>
                <i v-else class="icon" style="color: #86ffa6;">arrow_downward</i>
              </div>
            </div>

            <!--<div class="pie_item">-->
              <!--<div>独立访客</div>-->
              <!--<div>{{ browseData.uv }}</div>-->
              <!--<div>-->
                <!--同比 {{ parseInt(browseData.uvRatio) }}%-->
                <!--<i v-if="browseData.uvRatioTrend == 1" style="color: rgb(255, 174, 169);" class="icon">arrow_upward</i>-->
                <!--<i v-else class="icon" style="color: #86ffa6;">arrow_downward</i>-->
              <!--</div>-->
            <!--</div>-->

          </div>

          <div v-show="showEcharts2" style="height: 400px;width: 100%;" ref="echarts2"></div>

          <div v-show="!showEcharts2" style="height: 400px;width: 100%;" class="load_box">
            <loading></loading>
          </div>

        </div>

      </div>

      <div class="box_line"></div>

      <div style="width: 1000px;margin: 0 auto;padding-top: 40px;">


        <div class="data_title">
          <div style="font-size: 24px;font-weight: bold;">内容统计</div>

          <div>
            <span class="data_title_span" @click="content1.type = 1" :class="{data_titleon: content1.type == 1}">昨天</span>
            <span class="data_title_span" @click="content1.type = 2" :class="{data_titleon: content1.type == 2}">7天</span>
            <span class="data_title_span" @click="content1.type = 3" :class="{data_titleon: content1.type == 3}">30天</span>
            <vue-datepicker-local
              v-model="content1.time"
              format="YYYY-MM-DD"
              @confirm="content1.type = 4"
              show-buttons></vue-datepicker-local>
            <!--<span class="data_title_span">数据导出</span>-->
          </div>
        </div>

        <div class="dc_tab">
          <div class="dc_tab_top">
            <span class="data_title_span" :class="{ data_titleon: tab_left == 0}" @click="tab_left = 0">编辑排行</span>
            <span class="data_title_span" :class="{ data_titleon: tab_left == 1}" @click="tab_left = 1">流量贡献</span>
            <span class="data_title_span" :class="{ data_titleon: tab_left == 2}" @click="tab_left = 2">频道排行</span>
            <span class="data_title_span" :class="{ data_titleon: tab_left == 3}" @click="tab_left = 3">热门资讯</span>
            <span class="data_title_span" :class="{ data_titleon: tab_left == 4}" @click="tab_left = 4">资讯分类</span>
          </div>

          <div v-show="showEchartsall" :style="{
            'margin-left': tab_left * -1000 + 'px'
          }" class="dc_tab_itembox">
            <div class="data_bb dc_tab_item" style="margin-bottom: 20px;">

              <div class="data_title">
                <h3>编辑排行</h3>
              </div>

              <div class="setting-card f-14">
                <table>
                  <thead>
                  <th>序号</th>
                  <th>姓名</th>
                  <th>发布内容</th>
                  <th>内容通过率</th>
                  <th>阅读</th>
                  <th>点赞</th>
                  <th>评论</th>
                  <th>分享</th>
                  </thead>
                  <tbody v-if="list.length > 0">
                  <tr class="hover_tr" v-if="list[(listPage.page - 1) * 10 + index]" v-for="(item, index) in 10" @click="openDetail(item.id)">
                    <td>
                      <img v-if="listPage.page == 1 && index < 3"
                           :src="imgList[index]" alt="">
                      <span v-else>{{ (listPage.page - 1) * 10 + index + 1 }}</span>
                    </td>
                    <td>{{ list[(listPage.page - 1) * 10 + index].name }}</td>
                    <td>{{ list[(listPage.page - 1) * 10 + index].send }}</td>
                    <td>{{ list[(listPage.page - 1) * 10 + index].pass }}</td>
                    <td>{{ list[(listPage.page - 1) * 10 + index].pv }}</td>
                    <td>{{ list[(listPage.page - 1) * 10 + index].digg }}</td>
                    <td>{{ list[(listPage.page - 1) * 10 + index].comment }}</td>
                    <td>{{ list[(listPage.page - 1) * 10 + index].share }}</td>
                  </tr>
                  </tbody>
                </table>
                <div v-if="list.length > 0" class="pagination_box">
                  <span>共{{ listPage.total }}条</span>
                  <pagination :page="listPage.page" :size="10" :total="listPage.total" @change="p => { listPage.page = p; }"></pagination>
                </div>
              </div>

            </div>

            <div class="data_bb dc_tab_item" style="margin-bottom: 20px;">

              <div class="data_title">
                <h3>流量贡献</h3>
              </div>

              <div class="flex" style="height: 300px;">

                <div style="width: 300px;" ref="echarts3"></div>

                <div style="width: 640px;margin-left: 20px;" ref="echarts4"></div>

              </div>

            </div>

            <div class="data_bb dc_tab_item" style="margin-bottom: 20px;">

              <div class="data_title">
                <h3>频道排行</h3>
              </div>

              <div class="setting-card f-14">
                <table>
                  <thead>
                  <th>序号</th>
                  <th>频道名称</th>
                  <th>内容数</th>
                  <th>阅读</th>
                  <th>点赞</th>
                  <th>评论</th>
                  <th>分享</th>
                  </thead>
                  <tbody v-if="list1.length > 0">
                  <tr v-for="(item, index) in 10" v-if="list1[(list1Page.page - 1) * 10 + index]" @click="openDetail(item.id)">
                    <td>
                      <img v-if="listPage.page == 1 && index < 3"
                           :src="imgList[index]" alt="">
                      <span v-else>{{ (listPage.page - 1) * 10 + index + 1 }}</span>
                    </td>
                    <td>{{list1[(list1Page.page - 1) * 10 + index].name}}</td>
                    <td>{{list1[(list1Page.page - 1) * 10 + index].content}}</td>
                    <td>{{list1[(list1Page.page - 1) * 10 + index].pv}}</td>
                    <td>{{list1[(list1Page.page - 1) * 10 + index].digg}}</td>
                    <td>{{list1[(list1Page.page - 1) * 10 + index].comment}}</td>
                    <td>{{list1[(list1Page.page - 1) * 10 + index].share}}</td>
                  </tr>
                  </tbody>
                </table>
                <div v-if="list1.length > 0" class="pagination_box">
                  <span>共{{ list1Page.total }}条</span>
                  <pagination :page="list1Page.page" :size="10" :total="list1Page.total" @change="p => { list1Page.page = p; }"></pagination>
                </div>
              </div>

            </div>

            <div class="data_bb dc_tab_item" style="margin-bottom: 20px;">

              <div class="data_title">
                <h3>热门资讯</h3>
              </div>

              <div class="setting-card f-14">
                <table>
                  <thead>
                  <th>序号</th>
                  <th style="text-align: left;">文章标题</th>
                  <th>创建人</th>
                  <th>文章类型</th>
                  <th>阅读数</th>
                  </thead>
                  <tbody v-if="list2.length > 0">
                  <tr v-for="(item, index) in 10" v-if="list2[(list2Page.page - 1) * 10 + index]" :key="index">
                    <td>
                      <img v-if="listPage.page == 1 && index < 3"
                           :src="imgList[index]" alt="">
                      <span v-else>{{ (listPage.page - 1) * 10 + index + 1 }}</span>
                    </td>
                    <td style="text-align: left;">{{list2[(list2Page.page - 1) * 10 + index].title}}</td>
                    <td>{{list2[(list2Page.page - 1) * 10 + index].createUser}}</td>
                    <td>{{list2[(list2Page.page - 1) * 10 + index].app}}</td>
                    <td>{{list2[(list2Page.page - 1) * 10 + index].pv}}</td>
                  </tr>
                  </tbody>
                </table>
                <div v-if="list2.length > 0" class="pagination_box">
                  <span>共{{ list1Page.total }}条</span>
                  <pagination :page="list2Page.page" :size="10" :total="list2Page.total" @change="p => { list2Page.page = p; }"></pagination>
                </div>
              </div>

            </div>

            <div class="data_bb dc_tab_item" style="margin-bottom: 20px;">

              <div class="data_title">
                <h3>资讯分类</h3>
              </div>

              <div ref="echarts5" style="height: 400px;"></div>

            </div>
          </div>

          <div v-show="!showEchartsall" style="height: 400px;width: 100%;" class="load_box">
            <loading></loading>
          </div>
        </div>


      </div>


    </div>



  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/toolbox'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/chart/pie'
  import VueDatepickerLocal from 'vue-datepicker-local'
  import Account from '@/components/account'
  import Dock from '@/components/dock'
  import moment from 'moment'
  let time = new Date()
  var today = moment(time).format('YYYY-MM-DD')
  var last = moment(new Date(time.getTime() - 24 * 60 * 60 * 1000 * 30)).format('YYYY-MM-DD')


  export default {
    components: { VueDatepickerLocal, Account, Dock },
    data () {
      return {
        option1total: 0,
        tab_left: 0,
        loadingShow: false,
        total: 1,
        page: 1,
        list: [],
        listPage: {
          total: 100,
          page: 1,
        },
        list1: [],
        list1Page: {
          total: 100,
          page: 1,
        },
        list2: [],
        list2Page: {
          total: 100,
          page: 1,
        },
        top: null,
        trendConfig: {
          newUsers: '新增用户',
          activeUsers: '活跃用户',
          retainedUsers: '次日留存',
          duration: '使用时长',
          startup: '启动次数',
          download: '总下载量',
          install: '总安装量'
        },
        trendType: 'newUsers',
        trendData: {},
        topData: {
          type: 3,
          time: [last, today]
        },
        dateRange: [last, today],
        myEcharts: null,
        echartsData: {
          type: '',
          data: []
        },
        option: {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2019-12-21', '2019-12-22', '2019-12-23', '2019-12-24', '2019-12-25', '2019-12-26', '2019-12-27'],
            splitLine: {
              show: true,
              lineStyle:{
                color: ['#ddd'],
                width: 1,
                type: 'solid'
              }
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle:{
                color: ['#ddd'],
                width: 1,
                type: 'solid'
              }
            }
          },
          series: [
            {
              smooth: true,
              name: '中文站',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210],
              itemStyle: {
                opacity: 1,
                color: '#6dbbff'
              },
              areaStyle: {
                opacity: 0.5,
                color: '#6dbbff'
              }
            }
          ]
        },
        myEcharts1: null,
        option1: {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          color: ['#4962FC', '#67b8f3', '#ab9fe5', '#71e7b1', '#fecb9b', '#342af9'],
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              // roseType: 'area',
              avoidLabelOverlap: false,
              label: {
                position: 'outer',
                alignTo: 'none',
                bleedMargin: 5
              },
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ]
            }
          ]
        },
        myEcharts2: null,
        option2: {
          color: ['#67b8f3','#12e78c','#fe8104','#01C2F9'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            icon: 'roundRect',
            data: ['阅览次数', '独立访客'],
            right: 20,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            splitLine: {
              show: true,
              lineStyle:{
                color: ['#ddd'],
                width: 1,
                type: 'solid'
              }
            }
          },
          yAxis: {
            type: 'value',
            // splitLine: {
            //   show: true,
            //   lineStyle:{
            //     color: ['#ddd'],
            //     width: 1,
            //     type: 'solid'
            //   }
            // }
          },
          series: [
            {
              name: '阅览次数',
              type: 'line',
              smooth: true,
              stack: '阅览总量',
              data: []
            },
            // {
            //   name: '独立访客',
            //   type: 'line',
            //   smooth: true,
            //   stack: '访客总量',
            //   data: []
            // }
          ]
        },
        myEcharts3: null,
        option3: {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: ['#4962FC', '#67b8f3', '#ab9fe5', '#71e7b1', '#fecb9b', '#342af9'],
          series: [
            {
              name: '访问来源',
              type: 'pie',
              avoidLabelOverlap: false,
              radius: ['20%', '40%'],
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        myEcharts4: null,
        option4: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220],
              barMaxWidth: 30,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = [
                      {
                        first: '#5073fc',
                        end: '#83b2fc'
                      },
                      {
                        first: '#9580e5',
                        end: '#a1a5e5'
                      },
                      {
                        first: '#7bb8f3',
                        end: '#93e4f3'
                      },
                      {
                        first: '#60e7a5',
                        end: '#9ae7b2'
                      },
                      {
                        first: '#feac81',
                        end: '#fec2a9'
                      }
                    ]
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 1,
                      color: colorList[params.dataIndex % 5].first
                    }, {
                      offset: 0,
                      color: colorList[params.dataIndex % 5].end
                    }])
                  }
                }
              }
            }
          ]
        },
        myEcharts5: null,
        option5: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'bar',
            barMaxWidth: 30,
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    {
                      first: '#5073fc',
                      end: '#83b2fc'
                    },
                    {
                      first: '#7bb8f3',
                      end: '#93e4f3'
                    },
                    {
                      first: '#9580e5',
                      end: '#a1a5e5'
                    },
                    {
                      first: '#60e7a5',
                      end: '#9ae7b2'
                    },
                    {
                      first: '#feac81',
                      end: '#fec2a9'
                    },
                    {
                      first: '#3b3ef9',
                      end: '#5067f9'
                    }
                  ]
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 1,
                    color: colorList[params.dataIndex % 6].first
                  }, {
                    offset: 0,
                    color: colorList[params.dataIndex % 6].end
                  }])
                }
              }
            }
          }]
        },
        browseData: null,
        browseSearch: {
          type: 3,
          time: [last, today]
        },
        content1: {
          type: 3,
          time: [last, today]
        },
        imgList: [
          require('../../assets/img/NO.1.png'),
          require('../../assets/img/NO.2.png'),
          require('../../assets/img/NO.3.png')
        ],
        showEcharts: false,
        showEcharts1: false,
        showEcharts2: false,
        showEchartsall: false,
      }
    },
    methods: {
      getCategory () {
        this.showEchartsall = false
        let data = {
          type: this.topData.type,
          fromDay: this.topData.type == 4 ? moment(this.topData.time[0]).format('YYYY-MM-DD') : '',
          toDay:  this.topData.type == 4 ? moment(this.topData.time[1]).format('YYYY-MM-DD') : ''
        }
        this.$http.post('/cri-cms-platform/appStatistics/category.monitor', data).then(res => {
          this.option5.xAxis.data = []
          this.option5.series[0].data = []
          res.list.forEach(item => {
            this.option5.xAxis.data.push(item.name)
            this.option5.series[0].data.push(item.value)
          })

          this.showEchartsall = true
          this.nextFun(() => {
            this.myEcharts5 = echarts.init(this.$refs.echarts5)
            this.myEcharts5.setOption(this.option5)
          })
        })
      },
      getTopData () {
        this.top = null
        let data = {
          type: this.topData.type,
          fromDay: this.topData.type == 4 ? moment(this.topData.time[0]).format('YYYY-MM-DD') : '',
          toDay:  this.topData.type == 4 ? moment(this.topData.time[1]).format('YYYY-MM-DD') : ''
        }
        this.$http.post('/cri-cms-platform/appStatistics/index.monitor', data).then(res => {
          this.top = res.data
          this.loadingShow = false
        })
      },
      getTopLineData () {
        this.showEcharts = false
        this.$http.post('/cri-cms-platform/appStatistics/trend.monitor', {
          fromDay: moment(this.dateRange[0]).format('YYYY-MM-DD'),
          toDay: moment(this.dateRange[1]).format('YYYY-MM-DD')
        }).then(res => {
          let data = {}
          for (let k in res.data) {
            data[k] = {
              time: [],
              value: []
            }
            res.data[k].forEach(item => {
              data[k].time.push(item.day)
              data[k].value.push(item.value)
            })
          }
          this.trendData = data
          this.option.xAxis.data = this.trendData[this.trendType].time
          this.option.series[0].data = this.trendData[this.trendType].value
          this.option.series[0].name = this.trendConfig[this.trendType]

          this.showEcharts = true
          this.nextFun(() => {
            this.myEcharts = echarts.init(this.$refs.echarts)
            this.myEcharts.setOption(this.option)
          })
        })
      },
      getPieData () {
        this.showEcharts1 = false
        this.$http.post('/cri-cms-platform/appStatistics/download.monitor').then(res => {
          let arr = []
          let name = []
          this.option1total = 0
          res.data.forEach(item => {
            arr.push({
              value: item.channelCount,
              name: item.channelName,
              label: {
                formatter: '{b} ({d}%)'
              },
            })
            name.push(item.channelName)
          })

          this.option1.series[0].data = arr
          this.option1.legend.data = name

          this.showEcharts1 = true
          this.nextFun(() => {
            this.myEcharts1 = echarts.init(this.$refs.echarts1)
            this.myEcharts1.setOption(this.option1)
          })
        })
      },
      getBrowse () {
        this.showEcharts2 = false
        let data = {
          type: this.browseSearch.type,
          fromDay: this.browseSearch.type == 4 ? moment(this.browseSearch.time[0]).format('YYYY-MM-DD') : '',
          toDay:  this.browseSearch.type == 4 ? moment(this.browseSearch.time[1]).format('YYYY-MM-DD') : ''
        }
        this.$http.post('/cri-cms-platform/appStatistics/browse.monitor', data).then(res => {
          this.option2.xAxis.data = []
          // this.option2.series[1].data = []
          // this.option2.series[0].data = []
          this.browseData = res
          this.browseData.pvTrend.forEach((item, index) => {
            this.option2.xAxis.data.push(item.day)
            this.option2.series[0].data.push(item.value)
            // this.option2.series[1].data.push(this.browseData.uvTrend[index].value)
          })

          this.showEcharts2 = true
          this.nextFun(() => {
            this.myEcharts2 = echarts.init(this.$refs.echarts2)
            this.myEcharts2.setOption(this.option2)
          })
        })
      },
      getContent1 () {
        this.showEchartsall = false
        let data = {
          type: this.content1.type,
          fromDay: this.content1.type == 4 ? moment(this.content1.time[0]).format('YYYY-MM-DD') : '',
          toDay:  this.content1.type == 4 ? moment(this.content1.time[1]).format('YYYY-MM-DD') : ''
        }
        console.log(data)
        this.$http.post('/cri-cms-platform/appStatistics/content.monitor', data).then(res => {
          this.list = res.list
          this.listPage.total = res.list.length
        })

        this.$http.post('/cri-cms-platform/appStatistics/channel.monitor', data).then(res => {
          this.list1 = res.list
          this.list1Page.total = res.list.length
        })

        this.$http.post('/cri-cms-platform/appStatistics/traffic.monitor', data).then(res => {
          let name = []
          let value = []
          res.list.forEach(item => {
            name.push(item.name)
            value.push(item.value)
          })
          this.option4.xAxis[0].data = name
          this.option4.series[0].data = value
          this.option3.series[0].data = res.list


          this.showEchartsall = true
          this.nextFun(() => {
            this.myEcharts3 = echarts.init(this.$refs.echarts3)
            this.myEcharts4 = echarts.init(this.$refs.echarts4)
            this.myEcharts3.setOption(this.option3)
            this.myEcharts4.setOption(this.option4)
          })
        })
      },
      getTopArticle () {
        this.loadingShow = true
        let data = {
          type: this.browseSearch.type,
          fromDay: this.browseSearch.type == 4 ? moment(this.browseSearch.time[0]).format('YYYY-MM-DD') : '',
          toDay:  this.browseSearch.type == 4 ? moment(this.browseSearch.time[1]).format('YYYY-MM-DD') : ''
        }
        this.$http.post('/cri-cms-platform/appStatistics/topContent.monitor', data).then(res => {
          this.list2 = res.list
          this.list2Page.total = res.list.length
          this.loadingShow = false
        })
      },
      nextFun (fun) {
        this.$nextTick(fun)
      }
    },
    mounted () {
      this.getTopData()
      this.getPieData()
      this.getBrowse()
      this.getContent1()
      this.getTopLineData()
      this.getTopArticle()
      this.getCategory()
    },
    watch: {
      'browseSearch.type' (val) {
        if (val != 4) {
          let stime = new Date()
          let stoday = moment(stime).format('YYYY-MM-DD')
          let slast = ''
          if (val == 1) {
            slast = moment(new Date(time.getTime() - 24 * 60 * 60 * 1000 * 1)).format('YYYY-MM-DD')
          } else if (val == 2) {
            slast = moment(new Date(time.getTime() - 24 * 60 * 60 * 1000 * 7)).format('YYYY-MM-DD')
          } else if (val == 3) {
            slast = moment(new Date(time.getTime() - 24 * 60 * 60 * 1000 * 30)).format('YYYY-MM-DD')
          }
          this.browseSearch.time = [ slast, stoday]
        }
        this.getBrowse()
      },
      'content1.type' (val) {
        if (val != 4) {
          let stime = new Date()
          let stoday = moment(stime).format('YYYY-MM-DD')
          let slast = ''
          if (val == 1) {
            slast = moment(new Date(time.getTime() - 24 * 60 * 60 * 1000 * 1)).format('YYYY-MM-DD')
          } else if (val == 2) {
            slast = moment(new Date(time.getTime() - 24 * 60 * 60 * 1000 * 7)).format('YYYY-MM-DD')
          } else if (val == 3) {
            slast = moment(new Date(time.getTime() - 24 * 60 * 60 * 1000 * 30)).format('YYYY-MM-DD')
          }
          this.content1.time = [ slast, stoday]
        }
        this.getContent1()
      },
      'topData.type' (val) {
        if (val != 4) {
          let stime = new Date()
          let stoday = moment(stime).format('YYYY-MM-DD')
          let slast = ''
          if (val == 1) {
            slast = moment(new Date(time.getTime() - 24 * 60 * 60 * 1000 * 1)).format('YYYY-MM-DD')
          } else if (val == 2) {
            slast = moment(new Date(time.getTime() - 24 * 60 * 60 * 1000 * 7)).format('YYYY-MM-DD')
          } else if (val == 3) {
            slast = moment(new Date(time.getTime() - 24 * 60 * 60 * 1000 * 30)).format('YYYY-MM-DD')
          }
          this.topData.time = [ slast, stoday]
        }
        this.getTopData()
      },
      'trendType' () {
        this.option.xAxis.data = this.trendData[this.trendType].time
        this.option.series[0].data = this.trendData[this.trendType].value
        this.option.series[0].name = this.trendConfig[this.trendType]
        this.myEcharts = echarts.init(this.$refs.echarts)
        this.myEcharts.setOption(this.option)
      }
    }
  }
</script>

<style scoped>
  .load_box{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pagination_box{
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
  }
  table{
    text-align: center;
  }
  .hover_tr:hover{
    background: #e2f4ff;
  }
  thead{
    font-weight: bold;
  }
  .data_top{
    background: #fff;
    height: 40px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
  }
  .data_box{
    width: 1000px;
    margin: 0 auto 40px;
    /*box-shadow: 2px 2px 4px rgba(0,0,0,0.2);*/
    background: #fff;
    padding: 20px;
    border-radius: 8px;
  }
  .data_title{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .data_title h3{
    border-left: 4px solid #00a0e9;
    padding-left: 10px;
  }
  .data_title_span{
    margin: 0 10px;
    font-size: 12px;
    color: #00a0e9;
    cursor: pointer;
    display: inline-block;
    padding: 4px 10px;
    border-radius: 6px;
    transition: 0.4s;
  }
  .data_titleon{
    background: #00a0e9;
    color: #fff;
  }
  .data_titleon{
    background: #00a0e9;
    color: #fff;
  }
  .data_icon{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 15px;
    margin: auto 0;
    opacity: 0.5;
    transition: 0.4s;
  }
  .data_item{
    position: relative;
    width: 23%;
    box-sizing: border-box;
    padding: 5px 15px;
    margin: 1%;
    background-image: linear-gradient(to bottom right, #3491ff, #63ceff);
    border-radius: 8px;
    color: #fff;
    box-shadow: 0 0 10px rgba(99,206,255, 0.6);
    overflow: hidden;
  }
  .data_item:after{
    content: '';
    background: #fff;
    display: block;
    width: 300px;
    height: 100px;
    position: absolute;
    top: 0px;
    left: -130px;
    z-index: 6;
    opacity: 0.1;
    transform: rotate(-45deg);
    transition: 0.4s;
  }
  .data_item:hover .data_icon{
    opacity: 1;
  }
  .data_item:hover:after{
    left: 100px;
  }
  .data_item p{
    margin: 5px 0;
    font-size: 14px;
  }
  .data_item p:nth-child(2){
    font-weight: bold;
  }
  .data_item p:nth-child(3){
    width: calc(100% - 80px);
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.6);
  }
  .data_item_box{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 388px;
  }
  .pie_lbox{
    width: 200px;
    padding-top: 50px;
  }
  .pie_rbox{
    width: 760px;
  }
  .pie_item:nth-child(1){
    margin-bottom: 20px;
  }
  .pie_item{
    font-size: 16px;
    font-weight: bold;
    background-image: linear-gradient(to bottom right, #3491ff, #63ceff);
    border-radius: 8px;
    color: #fff;
    box-shadow: 0 0 10px rgba(99,206,255, 0.6);
    padding: 10px;
  }
  .pie_item div:nth-child(2){
    font-size: 24px;
    padding: 10px 0;
    border-bottom: 1px solid #fff;
  }
  .pie_item div:nth-child(3){
    padding-top: 6px;
    font-size: 12px;
    font-weight: normal;
  }
  .pie_item i{
    font-size: 16px;
    margin-top: -2px;
  }
  .setting-card td{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  th,td {padding: 5px 10px;}
  tr {border-top: 1px solid #e1e1e1;cursor: pointer;}
  tr:hover {background: rgba(0, 0, 0, .05);}
  .loadbox{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dc_tab{
    width: 1000px;
    overflow: hidden;
  }
  .dc_tab_item{
    width: 980px;
    margin: 0 10px;
    padding: 0px 20px 20px;
    background: #fff;
    border-radius: 10px;
    /*box-shadow: 2px 2px 4px rgba(0,0,0,0.2);*/
  }
  .dc_tab_itembox{
    width: 5000px;
    transition: 0.4s;
    display: flex;
    align-items: start;
  }
  .dc_tab_top{
    padding: 20px 0;
  }
  td img{
    width: 46px;
  }
  .box_line{
    width: 100%;
    height: 20px;
    background: #f5f5f5;
  }
</style>
