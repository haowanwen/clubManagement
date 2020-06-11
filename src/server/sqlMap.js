//sqlMap.js sql语句
var sqlMap = {
    //登录时在accountinformation表中查找前端输入的id和password
    getLoginAccountInformation:"SELECT * FROM accountinformation WHERE userId = ?",
    //注册新用户是在表中插入前端传递到后台的数据
    newLoginAccountInformation:"INSERT INTO accountinformation (userId,password,userStatus,useName,sex,telNumber,userDesc) VALUES (?,?,?,?,?,?,?)",
    //-------------------------------------------
    //获取 社团管理 页面的 内容，获取社团展示的内容
    getClubsInformation :"SELECT si.clubsId,si.clubsName,si.userId,si.clubsdesc,ai.userId,ai.useName,ai.telNumber FROM clubsinformation si,accountinformation ai where si.userId = ai.userId",
    //联合多表修改 社团管理 页面的内容
    setClubsInformation:"update clubsinformation si,accountinformation ai set si.clubsName = ?,si.clubsdesc = ?,ai.useName = ?,ai.telNumber = ? where si.clubsId = ? and si.userId = ai.userId",
    //获取社团管理页面 新增社团模态框中的下拉列表数据
    getNewClubsOptions:"SELECT userId,useName FROM accountinformation where userStatus = '学生'",

    //一个学生只能是一个社团的社长，验证，如果已经是社长，删除那个社团，添加不成功
    selectClubsInformation:"SELECT clubsName FROM clubsinformation WHERE userId = ?;",
    //社团管理页面 新增社团
    saveNewClubs:"insert clubsinformation set clubsName = ?,userId = ?,clubsdesc = ?",
    //社团管理页面 新增社团 时同步更新clubsinformation表的数据
    updateClubsMember:"insert clubsmember set userId = ?,clubsMemberJob = '社长',clubsMemberStatus = '通过'",
    updateAllClubsMember:"update clubsinformation si,clubsmember cm set cm.clubsId = si.clubsId where si.userId = cm.userId and cm.clubsMemberJob = '社长'",
    




    //删除 社团管理 页面的社团，同时联动删除其他所有表格中相应的数据
    deleteClubs:"DELETE FROM clubsinformation WHERE clubsId = ?;DELETE FROM clubsmember WHERE clubsId = ?;DELETE FROM financialinformation WHERE clubsId = ?;DELETE FROM activeinformationssss WHERE clubsId = ?",
    //-------------------------------------------
    //获取 已有活动 页面的内容
    getExitClubsInformation:"SELECT cs.*,af.userId,af.useName,af.telNumber,cf.clubsId,cf.clubsName FROM activeinformationssss cs,accountinformation af,clubsinformation cf WHERE cs.clubsId=cf.clubsId AND cs.userId=af.userId AND cs.activeStatus='通过';",
    //获取 申请中活动 页面的内容
    getClubsApplicationInformation:"SELECT cs.*,af.userId,af.useName,af.telNumber,cf.clubsId,cf.clubsName FROM activeinformationssss cs,accountinformation af,clubsinformation cf WHERE cs.clubsId=cf.clubsId AND cs.userId=af.userId AND cs.activeStatus = '申请';",
    //申请中活动 页面 通过申请时，将数据库中的状态改为通过；并且将社团id，所用经费等新增到社团财务中
    updateClubsInformation:"UPDATE activeinformationssss set activeStatus = '通过' where activeId = ?;",
    updateFinancialInformation:"INSERT financialinformation SET clubsId = ?,moneyNumber = ?,activeId = ?;",
    //申请中活动 页面 拒绝申请时，将数据库中的数据删除
    deleteClubsInformation:"DELETE FROM activeinformationssss where activeId = ?",
    //----------------------------------------
    //修改信息页面  修改个人信息
    updateAccountInformation:"UPDATE accountinformation set password = ?,useName = ?,sex = ?,telNumber = ?,userDesc = ? WHERE userId = ?",
    //-------------------------------------------------
    //登录时查找登录人有几个社团，分别是什么身份
    selectMyClubs:"SELECT cm.clubsId,cm.clubsMemberJob,cm.clubsMemberStatus,sm.clubsId,sm.clubsName,sm.userId,sm.clubsDesc from clubsmember cm,clubsinformation sm where cm.userId = ? and cm.clubsId = sm.clubsId AND cm.clubsMemberStatus = '通过';",
    //------------------------------------------------------
    //获取换届管理页面下拉框,下拉框中的内容是本社团的成员/获取全部社员界面
    selectClubMember:"SELECT cm.userId,af.userId,af.useName,af.sex,af.telNumber,af.userDesc from clubsmember cm,accountinformation af where clubsId = ? and clubsMemberStatus = '通过' and cm.userId = af.userId",
    //换届管理页面 换届操作
    updateGeneralManagement:"UPDATE clubsInformation set userId = ? where clubsId = ?;UPDATE clubsmember set clubsMemberJob = '社长' where clubsId = ? and userId = ?;UPDATE clubsmember set clubsMemberJob = '社员' where clubsId = ? and userId = ?;",
    //获取 社团活动 页面
    // getMyClubsInformation :"SELECT * FROM activeinformation where activeStatus = '通过' and clubsId = ?",
    getMyClubsInformation :"SELECT cs.*,af.userId,af.useName,af.telNumber,cf.clubsId,cf.clubsName FROM activeinformationssss cs,accountinformation af,clubsinformation cf WHERE cs.clubsId=cf.clubsId AND cs.userId=af.userId AND cs.activeStatus='通过' AND cs.clubsId=?;",
    //保存新活动
    saveActive:"insert activeinformationssss set clubsId = ?,activeName = ?,userId = ?,activeFinance = ?,activePlace = ?,activeStartTime = ?,activeEndTime = ?,activeDesc = ?,activeStatus = '申请'",
    //全部社员 界面，删除社员
    // dleteClubsMember:"DELETE FROM clubsmember where userId = ? and clubsId = ? and clubsMemberJob = '社员'",
    dleteClubsMember:"DELETE FROM clubsmember where userId = ? and clubsId = ?",
    //申请中社员 界面，初始化
    selectApplicationClubMember:"SELECT cm.userId,af.userId,af.useName,af.sex,af.telNumber,af.userDesc from clubsmember cm,accountinformation af where clubsId = ? and clubsMemberStatus = '申请' and cm.userId = af.userId",
    //申请中社员 界面，通过申请
    updateApplicationClubMember:"UPDATE clubsmember set clubsMemberStatus = '通过' where userId = ? and clubsId = ?",
    //申请中社员 页面 拒绝申请时，将数据库中的数据删除
    deleteApplicationClubMember:"DELETE FROM clubsmember where userId = ? and clubsId = ?",
    //社团财务页面，初始化
    getClubsFinancial:"SELECT fm.*,af.*,nf.* FROM financialinformation fm,activeinformationssss af,accountinformation nf WHERE fm.activeId=af.activeId AND af.userId = nf.userId AND fm.clubsId = ?;",
    //-------------------------------------------
    //加入一个新社团前查找这个申请者是否已经在社团中或申请中
    selectBeforeAddNewClub:"SELECT * FROM clubsmember WHERE userId = ? AND clubsId = ?;",
    //社团展示  页面，加入新社团
    addOneNewClub:"INSERT clubsmember SET userId = ?,clubsId=?,clubsMemberJob = '社员',clubsMemberStatus='申请'",
    //获取社团活动 和 全部社员 界面的按钮权限
    getClubsJob:"SELECT clubsMemberJob FROM clubsmember WHERE clubsId = ? AND userId = ?;",
    //----------------------------------------------------------------------
    //首页获取活动-财务柱状图的数据
    getBarInformation:"SELECT activeName,activeFinance FROM activeinformationssss WHERE activeStatus='通过';",
    //首页获取师生数据比例
    getPieInformation:"SELECT userId,userStatus FROM accountinformation;"
  }
  
module.exports = sqlMap;