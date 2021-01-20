<script>
import Util from "@/assets/js/util.js";
import { LoadPersonInfo } from "@/network/users";

var profileMap = {};

function getProfileLazy(id) {
  //有就直接賦值，沒有就訂閲
  //   console.log(profileMap);
  if (profileMap.hasOwnProperty(id)) {
    if (profileMap[id] == "") {
      return getDefaultProfileUrl();
    } else if (profileMap[id] == "loading") {
      return getDefaultProfileUrl();
    }
    return "data:image/png;base64," + profileMap[id];
  } else {
    profileMap[id] = "loading";
    LoadPersonInfo(id).then((res) => {
      if (res.data.avatar == "" || res.data.avatar) {
        setProfile(id, res.data.avatar);
      }
    });
    return getDefaultProfileUrl();
  }
}
function getDefaultProfileUrl() {
  return "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
}
// function getProfile(id) {

//   //   console.log(profileMap);
//   if (profileMap.hasOwnProperty(id)) {
//     return profileMap[id];
//   } else {
//     profileMap[id] = "loading";
//     return null;
//   }
// }
function setProfile(id, profile) {
  profileMap[id] = profile;
  Util.$emit("GlobalMsg_profileUpdate", id);
}
// const name = 'shenxianhui';
// const age = 24;
//  function add(a,b) {
//     return a+ b
//   }
export default {
  getProfileLazy,
  setProfile,
  getDefaultProfileUrl,
  // age
};
</script>