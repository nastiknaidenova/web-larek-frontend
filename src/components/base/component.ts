export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {}
  
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
        element.classList.toggle(className, force);
    }
  
    protected setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }
  
    setDisable(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) element.setAttribute('disabled', 'disabled');
            else element.removeAttribute('disabled');
        }
    }
  
    protected setHidden(element: HTMLElement) {
        element.style.display = 'none';
    }
  
    protected setVisible(element: HTMLElement) {
        element.style.removeProperty('display');
    }
  
    protected setImage(element: HTMLElement, src: string, alt?: string) {
        if (element instanceof HTMLImageElement) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            } 
        }
    }
  
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}
