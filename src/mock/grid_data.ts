export const querydeviceimg = ['data:image/png;base64,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', 'data:image/png;base64,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', 'data:image/png;base64,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']


export const equipment_data = [
  {
    typeName: "现场服务申请",
    desc: "举升机、四轮定位仪等上门现场服务",
    l_bg: '#5e2228',
    r_bg: '#90424b',
    typeRes: [
      {
        link_image: require('img/icon/12.png'),
        path:'/eq_install',
        name: "现场安装"
      },
      {
        link_image: require('img/icon/13.png'),
        name: "现场培训"
      },
      {
        link_image: require('img/icon/14.png'),
        name: "现场维修"
      }
    ]
  },
  {
    typeName: "设备服务申请",
    desc: "元征各类产品非现场类售后服务申请",
    l_bg: '#2f5f48',
    r_bg: '#579379',
    typeRes: [
      {
        link_image: require('img/icon/15.png'),
        url: "http://18665898937.udesk.cn/im_client/feedback_tab/new.html?form=2&language=zh-cn",
        name: "返厂维修"
      },
      {
        link_image: require('img/icon/16.png'),
        url: "http://18665898937.udesk.cn/im_client/feedback_tab/new.html?form=8&language=zh-cn",
        name: "配件需求"
      },
      {
        link_image: require('img/icon/17.png'),
        name: "产品退换货",
        url: "http://18665898937.udesk.cn/im_client/feedback_tab/new.html?form=5&language=zh-cnhttp://18665898937.udesk.cn/im_client/feedback_tab/new.html?form=5&language=zh-cn"
      },
      {
        link_image: require('img/icon/20.png'),
        name: "客户索赔",
        url: 'http://18665898937.udesk.cn/im_client/feedback_tab/new.html?form=7&language=zh-cn'
      },
      {
        link_image: require('img/icon/19.png'),
        name: "产品翻新",
        url: 'http://18665898937.udesk.cn/im_client/feedback_tab/new.html?form=9&language=zh-cn'
      },
      {
        link_image: require('img/icon/18.png'),
        name: "设备资料"
      }
    ]
  },
  {
    typeName: "投诉与建议",
    desc: "留下您宝贵的建议，力求为您提供最优质的服务",
    l_bg: '#024374',
    r_bg: '#096bb4',
    typeRes: [
      {
        link_image: require('img/icon/21.png'),
        name: "客户投诉",
        url: 'http://18665898937.udesk.cn/im_client/feedback_tab/new.html?form=3&language=zh-cn'
      },
      {
        link_image: require('img/icon/22.png'),
        name: "产品改善建议",
        url: 'http://18665898937.udesk.cn/im_client/feedback_tab/new.html?form=4&language=zh-cn'
      },
      {
        link_image: require('img/icon/23.png'),
        name: "质量问题反馈",
        url: 'http://18665898937.udesk.cn/im_client/feedback_tab/new.html?form=6&language=zh-cn'
      }
    ]
  }
]

export const repir_data = [
  {
    title: "社区",
    desc: "汽修问题线上问，专家为您解决各种疑难杂症",
    l_bg: '#04b396',
    r_bg: '#07d6c5',
    list: [
      {
        link_image: require('img/icon/1.png'),
        name: "我要提问"
      },
      {
        link_image: require('img/icon/2.png'),
        name: "专家答疑"
      },
      {
        link_image: require('img/icon/3.png'),
        name: "远程诊断"
      }
    ]
  },
  {
    typeName: "工作台",
    desc: "技师维修辅助工具大全",
    l_bg: '#024374',
    r_bg: '#096bb4',
    typeRes: [
      {
        link_image: require('img/icon/4.png'),
        name: "维修案例"
      },
      {
        link_image: require('img/icon/5.png'),
        name: "维修资料"
      },
      {
        link_image: require('img/icon/6.png'),
        name: "故障指引"
      }
    ]
  }
]