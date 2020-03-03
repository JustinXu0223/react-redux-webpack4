/*
 * @component services.js
 * @description react ticky service
 * @time 2019/03/03
 * @author JUSTIN XU
 */
export async function getDemo1({ time = 2000 } = {}) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      reject(time);
    }, time),
  );
}
