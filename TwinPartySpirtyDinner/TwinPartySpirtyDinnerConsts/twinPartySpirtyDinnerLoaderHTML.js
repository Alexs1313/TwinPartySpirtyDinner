export const twinPartySpirtyDinnerLoaderHTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
  body {
    margin: 0;
    padding: 0;
    background: transparent;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .loader {
    --c-1: #a2ff37;
    --c-2: #5bb2ff;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .layer {
    font-size: 28px;
    font-family: "Segoe UI", Tahoma, sans-serif;
    font-weight: 800;
    text-transform: uppercase;
    position: absolute;
    letter-spacing: 2px;
  }

  .layer:nth-child(1) {
    color: var(--c-1);
    animation: kfs-3412 0.5s infinite;
  }

  .layer:nth-child(2) {
    color: var(--c-2);
    animation: kfs-3412 0.5s 0.25s infinite;
  }

  @keyframes kfs-3412 {
    0% {
      text-shadow: 0 0 30px var(--c-1);
      transform: scaleY(0);
      opacity: 0;
    }
    50% {
      transform: scaleY(1.4);
      opacity: 1;
    }
    100% {
      transform: scaleY(1.4);
      opacity: 0.9;
    }
  }
</style>
</head>

<body>
  <div class="loader">
    <div class="layer">LOADING</div>
    <div class="layer">LOADING</div>
  </div>
</body>
</html>
`;
