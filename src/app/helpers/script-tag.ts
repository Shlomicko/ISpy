export class ScriptTag {

  constructor(){
    this.script = document.createElement('script');
  }

  private script: any;

  public setSource(src: string): ScriptTag{
    this.script.setAttribute('src', src);
    return this;
  }

  public setType(type: string): ScriptTag{
    this.script.setAttribute('type', type);
    return this;
  }

  public onReadyStateChangeListener(callback: Function): ScriptTag{
    this.script.onreadystatechange = callback;
    return this;
  }

  public onLodListener(callback: Function): ScriptTag{
    this.script.onload = callback;
    return this;
  }

  public execute(): void{
    document.getElementsByTagName('head')[0].appendChild(this.script);
  }
}
