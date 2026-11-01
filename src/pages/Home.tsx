import { Portal } from "solid-js/web";

export default function Home() {
  return <>
      <Portal mount={document.getElementById("actionbar")!}>
        <h1>Accueil</h1>          
      </Portal>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        "justify-content": 'center',
        "align-items": 'center',
        "text-align": 'center',
      }}>
        <h1>Là où vos courses deviennent vraiment simples</h1>
      </div>
    </>
}