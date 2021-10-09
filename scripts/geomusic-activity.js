(async () => {
  window.setActivity = (appid, name, details, state, assets, buttons) => {
    findByUniqueProperties(["INVITE_BROWSER"]).SET_ACTIVITY.handler({
      socket: {
        id: 100,
        application: {
          id: appid? appid : "",
          name: name? name : "Standby",
        },
        transport: "ipc",
      },
      args: {
        pid: 10,
        activity: {
          details: details? details : "",
          state: state? state : "",
          assets: assets? assets : {},
          buttons: buttons? buttons : []
        },
      },
    })
  };
})();
