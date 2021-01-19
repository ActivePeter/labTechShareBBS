import { request, request_auth_required } from "@/network/request";

export function getUsersMultiData() {
  return request({
    url: "/api/users/"
  });
}

export function Login(data) {
  return request({
    method: "post",
    url: "/api/login/",
    data
  });
}

export function Register(data) {
  return request({
    method: "post",
    url: "/api/register/",
    data
  });
}

export function GetCode(data) {
  return request(
    {
      method: "post",
      url: "/api/emailcodes/",
      data
    },
    60000
  );
}

export function GetSms(data) {
  return request({
    method: "get",
    url: "/api/sms/",
    data
  });
}

export function LoadPersonInfo(id) {
  return request({
    method: "get",
    url: "/api/users/simple/" + id + "/"
  }).then(res => {
    // console.log("LoadPersonInfo");
    // console.log(res);
    var result = {};
    switch (res.status) {
      case 200:
        result.status = 200;
        result.data = res.data;
        break;
      case 404:
        result.status = 404;
        result.data = res.data;
        break;
    }
    return result;
  });
}

export function LoadPersonDetail(id) {
  return request_auth_required({
    method: "get",
    url: "/api/users/detail/",
  }).then(res => {
    // console.log("LoadPersonDetail");
    // console.log(res);
    // var result={};
    // switch(res.status){
    //   case 200:
    //     result.status=200;
    //     result.data=res.data.results;
    //     break;
    //   case 404:
    //     result.status=404;
    //     result.data=res.data;
    //     break;
    // }
    return res;
  });
}
export function UpdatePersonInfo(data) {
  console.log("UpdatePersonInfo");
  console.log(data);
  return request_auth_required({
    method: "put",
    url: "/api/users/detail/",
    data
  }).then(res => {
    console.log("UpdatePersonInfo_back");
    console.log(res);
    // var result={};
    // switch(res.status){
    //   case 200:
    //     result.status=200;
    //     result.data=res.data.results;
    //     break;
    //   case 404:
    //     result.status=404;
    //     result.data=res.data;
    //     break;
    // }
    return res;
  });
}

export function Profile_upload(id, fileName, blob) {
  console.log("Profile_upload");
  // console.log(id);
  // console.log(data1);
  let data = new FormData(); //创建form对象
  data.append('avatar', blob);
  return request_auth_required({
    method: "post",
    url: "/api/users/avatar/" + id + "/",
    data
  }).then(res => {
    // console.log("Profile_upload_back");
    console.log(res);
    var result = {};
    // switch(res.status){
    //   case 200:
    //     result.status=200;
    //     result.data=res.data.results;
    //     break;
    //   case 404:
    //     result.status=404;
    //     result.data=res.data;
    //     break;
    // }
    switch (res.status) {
      case 200:
        if (res.data.status == 0) {
          result.status = 200;
          result.profile = res.data.avatar;
          break;
        }

      default:
        result.status = 300;
    }

    return result;
  });
}

export function PersonalArticle_get(id, page) {
  // console.log("PersonalArticle_get");
  var suffix = "";
  if (page != 1) {
    suffix = "?page=" + page;
  }
  // // console.log(id);
  // // console.log(data1);
  // let data = new FormData(); //创建form对象
  // data.append('avatar', blob);
  return request({
    method: "get",
    url: "/api/user/" + id + "/articles/" + suffix,

  }).then(res => {
    // console.log("Profile_upload_back");
    // console.log(res);
    var result = {};
    // switch(res.status){
    //   case 200:
    //     result.status=200;
    //     result.data=res.data.results;
    //     break;
    //   case 404:
    //     result.status=404;
    //     result.data=res.data;
    //     break;
    // }
    switch (res.status) {
      case 200:
        result.status = 200;
        result.data = res.data;
        break;


      default:
        result.status = 300;
    }

    return result;
  });
}