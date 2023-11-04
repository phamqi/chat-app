const createStyle = (user, friend) => {
  const style = document.createElement("style");
  style.textContent = `
        .active {
          display: none;
        }
        .avatar {
            opacity: 0;
            height: 0px;
        }
        .${user}+.${friend} .active {
          display: flex;
        }
        .${friend}+.${user} .active  {
          display: flex;
        }
        .${user}+.${friend} .avatar {
            opacity: 1;
            height: 3rem;
        }
        .${friend}+.${user} .avatar  {
            opacity: 1;
            height: 3rem;
        }
        .wall+.${friend} .avatar {
            opacity: 1;
            height: 3rem;
        }
        .wall+.${user} .avatar  {
            opacity: 1;
            height: 3rem;
        }
        .wall+.${user} .active {
          display: flex;
        }
        .wall+.${friend} .active {
          display: flex;
        }
        .${friend}+.${user}  .send_at_time  {
          visibility: hidden;
          height: 0px;
        }
        .${user}+.${friend} .send_at_time {
          visibility: hidden;
          height: 0px;
        }
        .wall+.${friend} .send_at_time {
          visibility: hidden;
          height: 0px;
      }
      .wall+.${user} .send_at_time  {
          visibility: hidden;
          height: 0px;
      }
      `;
  document.head.appendChild(style);
};
export default createStyle;
