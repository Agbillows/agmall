<template>
  <div class="footer-background">
    <div class="container footer">
      <div class="footer-left">
        <div class="footer-left-column">
          <div class="footer-primary">Ag商城</div>
          <div class="footer-secondary">中国买家用户使用得更多的商城平台</div>
          <div class="footer-secondary">
            Ag平台打造的<span class="text-red">"网购神器"</span>
          </div>
          <div class="footer-secondary">
            <span class="text-red">60,000</span> 多个专业领域
          </div>
          <div class="footer-secondary">
            <span class="text-red">600,000</span> 多个品牌
          </div>
          <div class="footer-secondary">
            <span class="text-red">760,000,000</span> 个商品
          </div>
          <div class="footer-secondary">
            <span class="text-red">38,000</span> 多个分类
          </div>
        </div>
        <div class="footer-left-column">
          <div class="footer-primary">关于我们</div>
          <div class="footer-secondary">关于Ag</div>
          <div class="footer-secondary">隐私政策</div>
          <div class="footer-secondary">商城平台服务协议</div>
          <div class="footer-secondary">网络信息侵权通知指引</div>
          <div class="footer-secondary">Ag商城服务监督员</div>
          <div class="footer-secondary">网站地图</div>
          <div class="footer-secondary">联系我们</div>
        </div>
        <div class="footer-left-column">
          <div class="footer-primary">Vip服务</div>
          <div class="footer-secondary">商品攻略 免费体验</div>
          <div class="footer-secondary">商品问答 评估指南</div>
          <div class="footer-secondary">专业咨询 海量宝贝</div>
          <div class="footer-secondary">偏好设置 随机抽奖</div>
          <div class="footer-secondary">自动评论 账单统计</div>
          <div class="footer-secondary">消费分析 APP下载</div>
          <div class="footer-secondary">特价秒杀 发现更多</div>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-right-column">
          <img src="/index_bottom_wechat.png" />
          <div class="footer-right-primary">AgAPP</div>
          <div class="footer-right-primary">扫描立即下载</div>
        </div>
        <div class="footer-right-column">
          <img src="/index_bottom_wechat.png" />
          <div class="footer-right-primary">Ag商城</div>
          <div class="footer-right-primary">订阅号</div>
        </div>
        <div class="footer-right-column">
          <img src="/index_bottom_wechat.png" />
          <div class="footer-right-primary">Ag商城</div>
          <div class="footer-right-primary">官方服务号</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped="scoped">
/* footer 页脚组件 的 样式 */

/*  页脚的背景  */
.footer-background {
  margin-top: 20px; /*  盒子模型：外边距  上方  */
  background-color: #3c3c3c; /*  背景样式：背景颜色  纯色  */
}

/*  页脚  */
.footer {
  padding: 20px 0px; /*  盒子模型：填充物/内边距：上下20px 左右0px  */
  display: flex; /*  弹性布局：界面呈现：弹性容器  */
  justify-content: space-between; /*  弹性布局：设置元素在主轴上的对齐方式：两端对齐  */
  align-items: flex-start; /*  弹性布局：设置元素在侧轴上的对齐方式：起始端对齐  */
}

/*  页脚的左侧部分、右侧部分  */
.footer-left,
.footer-right {
  display: flex; /*  弹性布局：界面呈现：弹性容器  */
}

/*  页脚左侧的列  */
.footer-left-column {
  margin-right: 40px; /*  盒子模型：外边距  右侧  */
}

/*  页脚的主标题  */
.footer-primary {
  font-size: 14px; /*  文本样式：字体尺寸  */
  color: #c2c2c2; /*  文本样式：字体颜色  */
  margin-bottom: 10px; /*  盒子模型：外边距  下方  */
}

/*  页脚的副标题  */
.footer-secondary {
  font-size: 12px; /*  文本样式：字体尺寸  */
  color: #c2c2c2; /*  文本样式：字体颜色  */
  margin-bottom: 5px; /*  盒子模型：外边距  下方  */
}

/*  页脚右侧的列  */
.footer-right-column {
  margin-left: 40px; /*  盒子模型：外边距  左侧  */
}

/*  页脚右侧的标题文字  */
.footer-right-primary {
  font-size: 14px; /*  文本样式：字体尺寸  */
  color: #c2c2c2; /*  文本样式：字体颜色  */
  text-align: center; /*  文本样式：水平对齐方式：居中对齐  */
}
</style>
