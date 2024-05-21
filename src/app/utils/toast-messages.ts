export function showSucessMessage(message: string) {
  M.toast({
    html: message,
    classes: 'lime accent-2 black-text',
  });
}

export function showErrorMessage(message: string) {
  M.toast({ html: message });
}
