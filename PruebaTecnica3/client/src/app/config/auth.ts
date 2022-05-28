export const logoutTimeOut = function () {
    return setInterval(function () {
      localStorage.clear();
      location.reload();
    }, 1000 * 60 *29); // 30 minutes
  };