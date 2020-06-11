//router.js 后端 express 路由配置
const express = require('express');
const router = express.Router();
const api = require('./api');

//用户登录
router.get('/getLoginAccountInformation', (req, res, next) => {
  api.getLoginAccountInformation(req, res, next);
});
//用户注册
router.post('/newLoginAccountInformation', (req, res, next) => {
  api.newLoginAccountInformation(req, res, next);
});
//获取 社团管理 页面的 内容
router.get('/getClubsInformation', (req, res, next) => {
  api.getClubsInformation(req, res, next);
});
//联合多表修改 社团管理 页面的内容
router.post('/setClubsInformation', (req, res, next) => {
  api.setClubsInformation(req, res, next);
});
//获取社团管理页面 新增社团模态框中的下拉列表数据
router.get('/getNewClubsOptions', (req, res, next) => {
  api.getNewClubsOptions(req, res, next);
});
//一个学生只能是一个社团的社长，验证，如果已经是社长，删除那个社团，添加不成功
router.get('/selectClubsInformation', (req, res, next) => {
  api.selectClubsInformation(req, res, next);
});
//社团管理页面 新增社团时 联合多表修改
router.post('/saveNewClubs', (req, res, next) => {
  api.saveNewClubs(req, res, next);
});
//同步更新clubsinformation表的数据
router.post('/updateClubsMember', (req, res, next) => {
  api.updateClubsMember(req, res, next);
});
router.post('/updateAllClubsMember', (req, res, next) => {
  api.updateAllClubsMember(req, res, next);
});
//删除 社团管理 页面的社团，同时联动删除clubsmember表格中相应的数据
router.get('/deleteClubs', (req, res, next) => {
  api.deleteClubs(req, res, next);
});
//获取 已有活动 页面的内容
router.get('/getExitClubsInformation', (req, res, next) => {
  api.getExitClubsInformation(req, res, next);
});
//获取 申请中活动 页面的内容
router.get('/getClubsApplicationInformation', (req, res, next) => {
  api.getClubsApplicationInformation(req, res, next);
});
//申请中活动 页面 通过申请时，将数据库中的状态改为通过
router.get('/updateClubsInformation', (req, res, next) => {
  api.updateClubsInformation(req, res, next);
});
router.post('/updateFinancialInformation', (req, res, next) => {
  api.updateFinancialInformation(req, res, next);
});
//申请中活动 页面 拒绝申请时，将数据库中的数据删除
router.get('/deleteClubsInformation', (req, res, next) => {
  api.deleteClubsInformation(req, res, next);
});
//修改信息页面  修改个人信息
router.post('/updateAccountInformation', (req, res, next) => {
  api.updateAccountInformation(req, res, next);
});
//登录时查找登录人有几个社团，分别是什么身份
router.get('/selectMyClubs', (req, res, next) => {
  api.selectMyClubs(req, res, next);
});
//获取换届管理页面下拉框,下拉框中的内容是本社团的成员
router.get('/selectClubMember', (req, res, next) => {
  api.selectClubMember(req, res, next);
});
  //换届管理页面 换届操作
router.post('/updateGeneralManagement', (req, res, next) => {
  api.updateGeneralManagement(req, res, next);
});
//获取 社团活动 页面
router.get('/getMyClubsInformation', (req, res, next) => {
  api.getMyClubsInformation(req, res, next);
});
  //保存新活动
  router.post('/saveActive', (req, res, next) => {
    api.saveActive(req, res, next);
  });
  //全部社员 界面，删除社员
  router.get('/dleteClubsMember', (req, res, next) => {
    api.dleteClubsMember(req, res, next);
  });
  //申请中社员 界面，初始化
  router.get('/selectApplicationClubMember', (req, res, next) => {
    api.selectApplicationClubMember(req, res, next);
  });
  //申请中社员 界面，通过申请
  router.get('/updateApplicationClubMember', (req, res, next) => {
    api.updateApplicationClubMember(req, res, next);
  });
  //申请中社员 页面 拒绝申请时，将数据库中的数据删除
  router.get('/deleteApplicationClubMember', (req, res, next) => {
    api.deleteApplicationClubMember(req, res, next);
  });
  //社团财务页面，初始化
  router.get('/getClubsFinancial', (req, res, next) => {
    api.getClubsFinancial(req, res, next);
  });
  //加入一个新社团前查找这个申请者是否已经在社团中或申请中
  router.get('/selectBeforeAddNewClub', (req, res, next) => {
    api.selectBeforeAddNewClub(req, res, next);
  });
  //社团展示  页面，加入新社团
  router.get('/addOneNewClub', (req, res, next) => {
    api.addOneNewClub(req, res, next);
  });
  //获取社团活动 和 全部社员 界面的按钮权限
  router.get('/getClubsJob', (req, res, next) => {
    api.getClubsJob(req, res, next);
  });
  //首页获取活动-财务柱状图的数据
  router.get('/getBarInformation', (req, res, next) => {
    api.getBarInformation(req, res, next);
  });
  //首页获取师生数据比例
  router.get('/getPieInformation', (req, res, next) => {
    api.getPieInformation(req, res, next);
  });

module.exports = router;