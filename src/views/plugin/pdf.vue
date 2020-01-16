<template>
  <div class="pdf">
    <div class="main">
      <loading v-if="totalNum == 0"/>
      <pdf v-else :page="pdfPageNum" :src="pdfurl"></pdf>
    </div>
    <div class="ft">
      <v-pag 
        v-model="currentPage" 
        :page-count="totalNum"
        mode="simple" 
        @change="changePage"
      />
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import {is_production, SERVICE_URL} from '@/common/config'
import { Pagination } from 'vant'

export default {
  components: {
    pdf,
    'v-pag':Pagination
  },
  data() {
    return{
      pdfurl: null,
      pdfPageNum: 1,
      totalNum: 0,
      currentPage: 0
    }
  },
  mounted() {
    const url = this.$route.query.url 
    if ( is_production ) {
      this.pdfurl = pdf.createLoadingTask(`${SERVICE_URL}${url.join('/')}`)
    } else {
      this.pdfurl = pdf.createLoadingTask(`tps/${url.join('/')}`)
    }
   
    this.getPdf()
  },
  methods: {
    async getPdf() {  
      try {
        const pdf_data = await this.pdfurl
        console.log(pdf_data)
        if (pdf_data instanceof Object) {
          this.totalNum = pdf_data.numPages
        }
      } catch (error) {
        this.totalNum = -1
        this.$toast('访问出错，可能原因pdf资源解析异常')
      }
    },
    changePage(page) {
      this.pdfPageNum = page
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  overflow: auto;
  position: absolute;
  top:0;
  width: 100%;
  bottom: size(120);
}
.ft{  
  position: fixed;  
  bottom: size(1);
  width: 100%;
  height: size(100);
  background: #fff;
}
</style>
