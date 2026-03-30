import type { I18N } from '..';

import ratingUploadGuide from '../md/zh-cn/ratingUploadGuide.md?raw';
import ratingExplanation from '../md/zh-cn/ratingExplanation.md?raw';

const newZhcn: I18N.RecursiveStringRecord = {
  layout: {
    main: {
      song: '曲目',
      doc: '文档',
      newSong: '新曲目',
      diffchart: '难易度表',
      dani: '段位道场',
      gamecenter: '街机分布',
      measures: '评分表',
      user: {
        user: '用户',
        donderData: '评级',
        notLogined: '未登录',
        login: '登录',
        logout: '登出',
        theme: '主题',
        lang: '语言'
      }
    },
    'dedicated diffchart': {
      type: {
        clear: '通关',
        fc: '全连',
        dfc: '全良'
      },
      select: '选项'
    },
    '/auth/user': {
      user: '用户',
      myData: '我的资料',
      donderData: '评级'
    },
    rating: {
      title: '评级',
      me: '我的评级',
      ranking: '排位',
      measure: '评分表'
    }
  },
  component: {
    SongEditor: {
      difficulties: {
        easy: '简单',
        normal: '普通',
        hard: '困难',
        oni: '魔王',
        ura: '魔王(里)'
      },
      BasicEditor: {
        songNo: '曲目编号'
      },
      TitleEditor: {
        title: '标题',
        songTitle: '曲目名称',
        titleKo: '韩文',
        aliasKo: '韩文(非官方)',
        titleEn: '英文',
        aliasEn: '英文(非官方)',
        titleZhCN: '简体中文',
        romaji: '罗马字'
      },
      OtherEditor: {
        other: '其他',
        genre: '类型',
        bpmShiver: 'BPM 抖动',
        version: '收录版本',
        artist: '作者',
        commaPlz: '请以逗号分隔。',
        included: '收录状态',
        deleted: '已删除',
        asiaBanned: '亚洲版禁曲',
        krBanned: '韩国版禁曲',
        addedDate: '上架日期',
        use: '使用'
      },
      CoursesEditor: {
        course: '谱面'
      },
      CourseEditor: {
        level: '等级',
        branched: '谱面分歧',
        maxCombo: '最大连段数',
        playTime: '最大演奏时间(秒)',
        playTimeSub: '从第一个音符到最后一个音符的时间。',
        density: '最大密度(打/秒)',
        calculate: '计算',
        maxBalloon: '最大气球数',
        commaPlz: '请用逗号分隔。',
        maxRoll: '最大连打时间(秒)',
        dani: '段位',
        add: '新增',
        img: '谱面图片',
        imgLink: '图片链接'
      },
      DaniEditor: {
        first: '第一首',
        second: '第二首',
        third: '第三首'
      }
    },
    DaniDisplay: {
      type: {
        "gauge": "魂槽",
        "combo": "连段数",
        "score": "分数",
        "roll": "连打数",
        "hit": "击打数",
        "good": "良",
        "ok": "可",
        "bad": "不可",
        "score_sum": "总分"
      },
      suffix1: {
        percent: "%",
        times: "次",
        point: "分",
        count: "个"
      },
      suffix2: {
        up: '以上',
        down: '未满'
      }
    },
    Diffchart: {
      diffchart: '难易度表',
      downloadMessage: '图片下载中'
    }
  },
  title: {
    base: '太鼓达人维基',
    '/auth/login': '登录',
    '/auth/user': '我的资料',
    '/auth/user/donder': '鼓众资料',
    '/dani': '段位道场',
    '/diffchart/clear': '通关难易度表',
    '/diffchart/fc': '全连段难易度表',
    '/diffchart/dfc': '全良难易度表',
    '/gamecenter': '街机分布地图',
    '/gamecenter/report': '街机回报',
    '/measures': '谱面评级表',
    '/song': '曲目搜索',
    '/song/[songNo]': '查无结果',
    '/song/[songNo]/edit': '曲目编辑',
    '/song/add': '新增曲目',
    '/rating/me': '我的评级',
    '/rating/ranking': '排位',
    '/rating/measure': '评分表'
  },
  dani: {
    dan: {
      "senpo": "先锋",
      "jiho": "次锋",
      "chiuken": "中坚",
      "fukusho": "副将",
      "taisho": "大将",
      "beginner": "初级",
      "10kyu": "十级",
      "9kyu": "九级",
      "8kyu": "八级",
      "7kyu": "七级",
      "6kyu": "六级",
      '5kyu': '五级',
      '4kyu': '四级',
      '3kyu': '三级',
      '2kyu': '二级',
      '1kyu': '一级',
      '1dan': '初段',
      '2dan': '二段',
      '3dan': '三段',
      '4dan': '四段',
      '5dan': '五段',
      '6dan': '六段',
      '7dan': '七段',
      '8dan': '八段',
      '9dan': '九段',
      '10dan': '十段',
      'kuroto': '玄人',
      'meijin': '名人',
      'chojin': '超人',
      'tatsujin': '达人',
      'gaiden': '外传'
    },
    version: {
      'katsudon': 'Katsudon',
      'sorairo': '天蓝色',
      'momoiro': '桃色',
      'kimidori': '黄绿色',
      'murasaki': '紫版',
      'white': '白版',
      'red': '红版',
      'yellow': '黄版',
      'blue': '蓝版',
      'green': '绿版',
      'nijiiro_gaiden': '虹 外传',
      '20': '虹 2020',
      '21': '虹 2021',
      '22': '虹 2022',
      '23': '虹 2023',
      '24': '虹 2024',
      '25': '虹 2025',
      '26': '虹 2026',
      '27': '虹 2027',
      '28': '虹 2028',
      '29': '虹 2029',
      '30': '虹 2030'
    }
  },
  song: {
    difficulty: {
      easy: '简单',
      normal: '普通',
      hard: '困难',
      oni: '魔王',
      ura: '魔王(里)'
    }
  },
  page: {
    index: {
      shortcut: {
        song: '曲目',
        doc: '文档',
        diffchart: '难易度表',
        dani: '段位道场',
        gamecenter: '街机分布',
        rating: '评级'
      },
      notice: '公告'
    },
    songNo: {
      alert: {
        deleted: '此曲已被删除',
        krBanned: '此曲未在韩国上架',
        asiaBanned: '此曲未在亚洲上架'
      },
      multipleTitle: {
        translatedTitle: '翻译名称',
        ko: '韩文',
        aliasKo: '韩文(非官方)',
        en: '英文',
        aliasEn: '英文(非官方)',
        zhCN: '简体中文',
        romaji: '罗马字'
      },
      songData: {
        version: '收录版本',
        artists: '作者',
        addedDate: '上架日期'
      },
      course: {
        combos: '最大连段数',
        branched: '谱面分歧',
        balloons: '最大气球数',
        roll: '最大连打时间',
        density: '最大密度',
        playTime: '最大演奏时间',
        hitsec: '打/秒',
        sec: '秒',
        total: '总',
        count: '个',
        daniList: '段位收录清单',
        nthSong: '第几首',
        noDani: '段位收录',
        fumenImage: '谱面图'
      },
      preview: {
        branch: '分歧',
        branches: {
          normal: '普通谱面',
          advanced: '玄人谱面',
          master: '达人谱面'
        },
        mode: '模式',
        modes: {
          normal: '一般',
          fixedScroll: 'HS固定',
          fixedBPM: 'BPM固定'
        },
        isAnnotationMode: '使用注释'
      }
    },
    diffchart: {
      dfc: {
        '10 level dfc': '★10 全良难易度表',
        sections: {
          'SS': "SS",
          'iS+': "地力 S+",
          'pS+': "个人差 S+",
          'iS': "地力 S",
          'pS': "个人差 S",
          'iA+': '地力 A+',
          'pA+': '个人差 A+',
          'iA': "地力 A",
          'pA': "个人差 A",
          'iB': '地力 B',
          'pB': "个人差 B",
          'iC': '地力 C',
          'pC': '个人差 C',
          'iD': '地力 D',
          'pD': '个人差 D',
          'iE': '地力 E',
          'pE': '个人差 E',
          'iF': '地力 F'
        }
      },
      fc: {
        '10 level fc': '★10 全连段难易度表',
        '9 level fc': '★9 全连段难易度表',
        '8 level fc': '★8 全连段难易度表',
        '7 level fc': '★7 全连段难易度表',
        '6 level fc': '★6 全连段难易度表',
        sections: {
          'SS': "SS",
          'S+': "S+",
          'pS+': "个人差 S+",
          'S': "S",
          'pS': "个人差 S",
          'A+': 'A+',
          'pA+': '个人差 A+',
          'A': "A",
          'pA': "个人差 A",
          'B+': 'B+',
          'B': "B",
          'pB': "个人差 B",
          'C+': 'C+',
          'C': 'C',
          'pC': '个人差 C',
          'D': 'D',
          'E': 'E',
          'F': 'F'
        }
      }
    },
    dani: {
      go: '移动'
    },
    gamecenter: {
      selector: {
        search: '搜索'
      },
      machineInfo: '机台信息'
    },
    donder: {
      rating: {
        top: '上位'
      },
      section: {
        song: '曲目评级',
        measure: '评分表',
        explanation: '评分说明'
      },
      song: '曲目',
      otherSong: '其他曲目',
      link: '链接',
      download: '下载',
      downloadMessage: '图片下载中'
    },
    user: {
      showRating: {
        name: '显示评级个人档案',
        showRatingNick: '显示鼓众广场昵称',
        showRatingTaikoNo: '显示鼓众号码',
        showRatingSongs: '显示个别曲目评级',
        submit: '应用',
        success: '应用成功。',
        error: '发生错误。'
      }
    },
    rating: {
      ranking: {
        heading: '排位',
        ranking: '排名',
        tier: '线级',
        rating: '评级',
        nickname: '昵称'
      },
      measures: {
        heading: '评分表'
      },
      user: {
        nondisclosure: '个别曲目评级未公开。'
      }
    }
  }
}

const zhcn: I18N.LangFile = {
  other: {
    title: {
      base: '太鼓达人维基',
      '/auth/login': '登录',
      '/auth/user': '我的资料',
      '/auth/user/donder': '鼓众资料',
      '/dani': '段位道场',
      '/diffchart/clear': '通关难易度表',
      '/diffchart/fc': '全连段难易度表',
      '/diffchart/dfc': '全良难易度表',
      '/gamecenter': '街机分布地图',
      '/gamecenter/report': '街机回报',
      '/measures': '谱面评级表',
      '/song': '曲目搜索',
      '/song/[songNo]': '查无结果',
      '/song/[songNo]/edit': '曲目编辑',
      '/song/add': '新增曲目',
      '/rating/me': '我的评级',
      '/rating/ranking': '排位',
      '/rating/measure': '评分表',
    },
    dani: {
      dan: {
        "senpo": "先锋",
        "jiho": "次锋",
        "chiuken": "中坚",
        "fukusho": "副将",
        "taisho": "大将",
        "beginner": "初级",
        "10kyu": "十级",
        "9kyu": "九级",
        "8kyu": "八级",
        "7kyu": "七级",
        "6kyu": "六级",
        '5kyu': '五级',
        '4kyu': '四级',
        '3kyu': '三级',
        '2kyu': '二级',
        '1kyu': '一级',
        '1dan': '初段',
        '2dan': '二段',
        '3dan': '三段',
        '4dan': '四段',
        '5dan': '五段',
        '6dan': '六段',
        '7dan': '七段',
        '8dan': '八段',
        '9dan': '九段',
        '10dan': '十段',
        'kuroto': '玄人',
        'meijin': '名人',
        'chojin': '超人',
        'tatsujin': '达人',
        'gaiden': '外传'
      },
      version: {
        'katsudon': 'Katsudon',
        'sorairo': '天蓝色',
        'momoiro': '桃色',
        'kimidori': '黄绿色',
        'murasaki': '紫版',
        'white': '白版',
        'red': '红版',
        'yellow': '黄版',
        'blue': '蓝版',
        'green': '绿版',
        'nijiiro_gaiden': '虹 外传',
        '20': '虹 2020',
        '21': '虹 2021',
        '22': '虹 2022',
        '23': '虹 2023',
        '24': '虹 2024',
        '25': '虹 2025',
        '26': '虹 2026',
        '27': '虹 2027',
        '28': '虹 2028',
        '29': '虹 2029',
        '30': '虹 2030'
      }
    },
    difficulty: {
      easy: '简单',
      normal: '普通',
      hard: '困难',
      oni: '魔王',
      ura: '魔王(里)'
    }
  },
  '/auth/login': {
    forLogin: '登录自'
  },
  '/auth/user': {
    nickname: '昵称',
    change: '变更',
    nickRule: `昵称仅限使用英文字母、韩文、数字及 '-'，不支持空格。`,
    nickChangeSuccess: '变更成功',
    provider: '登录提供者',
    delete: '注销账号',
    error: {
      'New nickname is not in the correct format': '昵称格式不正确。',
      'Duplicated Nickname': '此昵称已被使用。'
    }
  },
  '/auth/user/donder': {
    noDonderData: '查无鼓众广场资料。请上传鼓众广场资料。',
    myDon: '我的小咚',
    lastUpdate: '最后更新日',
    songRating: '个别曲目评级',
    songTitle: '曲名',
    accuracy: '精准度',
    crown: '王冠',
    rating: '评级',
    hiroba: '广场',
    measureValue: '谱面定数',
  },
  '/song': {
    placeholder: '关键词',
    difficulty: '难易度',
    easy: '简单',
    normal: '普通',
    hard: '困难',
    oni: '魔王',
    omote: '魔王(表)',
    ura: '魔王(里)',
    genre: '类型',
    genres: {
      pops: '流行',
      anime: '动画',
      kids: '儿童',
      vocaloid: 'VOCALOID™',
      game: '游戏',
      namco: '南梦宫原创',
      variety: '综合',
      classic: '古典'
    },
    languages: {
      ja: '日文',
      ko: '韩文',
      ako: '韩文(非官方)',
      en: '英文',
      aen: '英文(非官方)',
      rom: '罗马字'
    }
  },
  '/song/[songNo]': {
    noSong: '查无此曲。',
    genres: {
      pops: '流行',
      anime: '动画',
      kids: '儿童',
      vocaloid: 'VOCALOID™',
      game: '游戏',
      namco: '南梦宫原创',
      variety: '综合',
      classic: '古典'
    }
  },
  '/song/add': {
    genres: {
      pops: '流行',
      anime: '动画',
      kids: '儿童',
      vocaloid: 'VOCALOID™',
      game: '游戏',
      namco: '南梦宫原创',
      variety: '综合',
      classic: '古典'
    }
  },
  '/diffchart': {
    type: {
      clear: '通关',
      fc: '全连段',
      dfc: '全良'
    },
    download: "下载",
    go: "移动",
    custom: '自定义'
  },
  '/diffchart/clear/[level]': {
    '10 level clear': '★10 通关难易度表',
    '9 level clear': '★9 通关难易度表',
    '8 level clear': '★8 通关难易度表',
    '7 level clear': '★7 通关难易度表',
    '6 level clear': '★6 通关难易度表',
    sections: {
      'SSS': '超难关',
      'SS': '难关',
      'S+': '最上+',
      'S': '最上',
      'A': '上',
      'B': '中上',
      'C': '中',
      'D': '中下',
      'E': '下',
      'F': '最下',
      'X': '个人差'
    },
    subname: "🔴 个人差极大&nbsp;&nbsp;&nbsp;🟢 注意初见&nbsp;&nbsp;&nbsp;🟣 全连段难度远高于通关难度"
  },
  '/diffchart/clear/[fc]': {
    '10 level fc': '★10 全连段难易度表',
    '9 level fc': '★9 全连段难易度表',
    '8 level fc': '★8 全连段难易度表',
    '7 level fc': '★7 全连段难易度表',
    '6 level fc': '★6 全连段难易度表',
    sections: {
      'SS': "SS",
      'S+': "S+",
      'pS+': "个人差 S+",
      'S': "S",
      'pS': "个人差 S",
      'A+': 'A+',
      'pA+': '个人差 A+',
      'A': "A",
      'pA': "个人差 A",
      'B+': 'B+',
      'B': "B",
      'pB': "个人差 B",
      'C+': 'C+',
      'C': 'C',
      'pC': '个人差 C',
      'D': 'D',
      'E': 'E',
      'F': 'F'
    }
  },
  '/gamecenter': {
    koreanGamecenterAlert: '这是韩国境内设有太鼓达人机台的街机地图。',
    amenity: {
      'water': '饮水机',
      'toilet': '卫生间',
      'park': '停车场',
      'capture': '侧录设备',
      'rental': '租借/包台',
      'night': '通宵营运',
      'atm': 'ATM',
      'fan': '电风扇',
      'mybachi': 'My Bachi'
    },
    date: {
      "0": "日",
      "1": "一",
      "2": "二",
      "3": "三",
      "4": "四",
      "5": "五",
      "6": "六"
    },
    report: '回报信息',
    favorites: '收藏夹',
    keyword: '关键词',
    region: '区域',
    all: '全部',
    amenityText: '便利设施',
    machineData: '机台信息',
    price: '价格',
    tunes: '曲数',
    count: '台数',
    login: '登录',
    needed: '是必需的。'
  },
  '/measures': {
    measureTable: '谱面定数表',
    donderData: '鼓众资料'
  },
  '/notice': {
    type: {
      wiki: '维基',
      official: '官方'
    }
  },
  ...newZhcn
} as const;

export default zhcn;
