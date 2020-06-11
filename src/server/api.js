//api.js 连接数据库，各种方法的实现
const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});

module.exports = {
  //获取指定用户的信息（表accountinformation）
  getLoginAccountInformation(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getLoginAccountInformation;
      connection.query(sql, [id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //注册新用户（表accountinformation）
  newLoginAccountInformation(req, res, next) {
    // userId,password,userStatus,useName,sex,telNumber,userDesc
    var userId = req.body.userId, 
    password = req.body.password,
    userStatus =req.body.userStatus,
    useName = req.body.useName,
    sex = req.body.sex,
    telNumber = req.body.telNumber,
    userDesc = req.body.userDesc;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.newLoginAccountInformation;
      connection.query(sql, [userId,password,userStatus,useName,sex,telNumber,userDesc], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //获取 社团管理 页面的 内容
  getClubsInformation(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getClubsInformation;
      connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //联合多表修改 社团管理 页面的内容
  setClubsInformation(req, res, next) {
    // si.clubsName = ?,si.clubsdesc = ?,ai.useName = ?,ai.telNumber = ?
    var siclubsName = req.body.siclubsName, 
    siclubsdesc = req.body.siclubsdesc,
    aiuseName =req.body.aiuseName,
    aitelNumber = req.body.aitelNumber,
    clubsId = req.body.clubsId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.setClubsInformation;
      connection.query(sql, [siclubsName,siclubsdesc,aiuseName,aitelNumber,clubsId], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //获取社团管理页面 新增社团模态框中的下拉列表数据
  getNewClubsOptions(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getNewClubsOptions;
      connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //一个学生只能是一个社团的社长，验证，如果已经是社长，删除那个社团，添加不成功
  selectClubsInformation(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.deleteClubs;
      connection.query(sql,[id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //社团管理页面 新增社团时 联合多表修改
  saveNewClubs(req, res, next) {
    // si.clubsName = ?,si.clubsdesc = ?,ai.useName = ?,ai.telNumber = ?
    var clubsName = req.body.clubsName, 
    userId = req.body.userId,
    clubsdesc =req.body.clubsdesc;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.saveNewClubs;
      connection.query(sql, [clubsName,userId,clubsdesc], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //同步更新clubsinformation表的数据
  updateClubsMember(req, res, next) {
    var userId = req.body.userId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateClubsMember;
      connection.query(sql, [userId], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //
  updateAllClubsMember(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateAllClubsMember;
      connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //删除 社团管理 页面的社团，同时联动删除其他表格中相应的数据
  deleteClubs(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.deleteClubs;
      connection.query(sql,[id,id,id,id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //获取 已有活动 页面的内容
  getExitClubsInformation(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getExitClubsInformation;
      connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //获取 申请中活动 页面的内容
  getClubsApplicationInformation(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getClubsApplicationInformation;
      connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //申请中活动 页面 通过申请时，将数据库中的状态改为通过
  updateClubsInformation(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateClubsInformation;
      connection.query(sql,[id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  updateFinancialInformation(req, res, next) {
    var clubsId = req.body.clubsId, 
    moneyNumber = req.body.moneyNumber,
    activeId =req.body.activeId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateFinancialInformation;
      connection.query(sql,[clubsId,moneyNumber,activeId], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //申请中活动 页面 拒绝申请时，将数据库中的数据删除
  deleteClubsInformation(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.deleteClubsInformation;
      connection.query(sql,[id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //修改信息页面  修改个人信息
  //password = ?,useName = ?,sex = ?,telNumber = ?,userDesc = ? WHERE userId = ?",
  updateAccountInformation(req, res, next) {
    var password = req.body.password, 
    useName = req.body.useName,
    sex =req.body.sex,
    telNumber = req.body.telNumber,
    userDesc = req.body.userDesc,
    userId = req.body.userId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateAccountInformation;
      connection.query(sql,[password,useName,sex,telNumber,userDesc,userId], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
   //登录时查找登录人有几个社团，分别是什么身份
   selectMyClubs(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectMyClubs;
      connection.query(sql,[id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //获取换届管理页面下拉框,下拉框中的内容是本社团的成员
  selectClubMember(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectClubMember;
      connection.query(sql,[id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //换届管理页面 换届操作
  //UPDATE clubsInformation set userId = ? where clubsId = ?;UPDATE clubsmember set clubsMemberJob = '社长'
  //where clubsId = ? and userId = ?;UPDATE clubsmember set clubsMemberJob = '社员' where clubsId = ? and userId = ?;",
  updateGeneralManagement(req, res, next) {
    var newId = req.body.newId, 
    clubsId = req.body.clubsId
    oldId = req.body.oldId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateGeneralManagement;
      connection.query(sql,[newId,clubsId,clubsId,newId,clubsId,oldId], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //获取 社团活动 页面
  getMyClubsInformation(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getMyClubsInformation;
      connection.query(sql,[id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //保存新活动
  saveActive(req, res, next) {
    var clubsId = req.body.clubsId,
    activeName=req.body.activeName,
    userId=req.body.userId,
    activeFinance=req.body.activeFinance,
    activePlace=req.body.activePlace,
    activeStartTime=req.body.activeStartTime,
    activeEndTime=req.body.activeEndTime,
    activeDesc=req.body.activeDesc;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.saveActive;
      connection.query(sql,[clubsId,activeName,userId,activeFinance,activePlace,activeStartTime,activeEndTime,activeDesc], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //全部社员 界面，删除社员
  dleteClubsMember(req, res, next) {
    var userId=req.query.userId,
    clubsId=req.query.clubsId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.dleteClubsMember;
      connection.query(sql,[userId,clubsId], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //申请中社员 界面，初始化
  selectApplicationClubMember(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectApplicationClubMember;
      connection.query(sql,[id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
   //申请中社员 界面，通过申请
   updateApplicationClubMember(req, res, next) {
    var userId = req.query.id,
    clubsId = req.query.clubsId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.updateApplicationClubMember;
      connection.query(sql,[userId,clubsId], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //申请中社员 页面 拒绝申请时，将数据库中的数据删除
  deleteApplicationClubMember(req, res, next) {
    var userId = req.query.id,
    clubsId = req.query.clubsId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.deleteApplicationClubMember;
      connection.query(sql,[userId,clubsId], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //社团财务页面，初始化
  getClubsFinancial(req, res, next) {
    var clubsId = req.query.clubsId;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getClubsFinancial;
      connection.query(sql,[clubsId], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //加入一个新社团前查找这个申请者是否已经在社团中或申请中
  selectBeforeAddNewClub(req, res, next) {
    var clubsId = req.query.clubsId;
    myId = req.query.myId
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectBeforeAddNewClub;
      connection.query(sql,[myId,clubsId], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //社团展示  页面，加入新社团
  addOneNewClub(req, res, next) {
    var clubsId = req.query.clubsId;
    myId = req.query.myId
    pool.getConnection((err, connection) => {
      var sql = sqlMap.addOneNewClub;
      connection.query(sql,[myId,clubsId], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //获取社团活动 和 全部社员 界面的按钮权限
  getClubsJob(req, res, next) {
    var clubsId = req.query.clubsId;
    userId = req.query.userId
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getClubsJob;
      connection.query(sql,[clubsId,userId], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //获取clubsmemberValue(参与社团的学生信息)数据库中全部信息
  getAllClubsMemberValue(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getAllClubsMemberValue;
      connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //获取数据库中指定id的信息
  getValue(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getValue;
      connection.query(sql, [id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //
  setValue(req, res, next) {
    var id = req.body.id, name = req.body.name;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.setValue;
      connection.query(sql, [name, id], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //首页获取活动-财务柱状图的数据
  getBarInformation(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getBarInformation;
      connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  //首页获取师生数据比例
  getPieInformation(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getPieInformation;
      connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
}