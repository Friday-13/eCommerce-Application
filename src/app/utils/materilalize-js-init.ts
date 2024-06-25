export default function initMaterializeComponent(
  selector: string,
  parrentElement: HTMLElement,
  initCallback: () => void
) {
  const waitRangeLoaded = setInterval(() => {
    console.log('setting');
    if (parrentElement.querySelector(selector)) {
      clearInterval(waitRangeLoaded);
      try {
        initCallback();
      } catch (e) {
        if (!(e instanceof TypeError)) {
          console.error(e);
        }
      }
    }
  }, 500);
}
