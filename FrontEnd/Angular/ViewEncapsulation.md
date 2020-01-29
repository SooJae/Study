https://stackblitz.com/edit/view-encapsulation-example?file=src%2Fmain.ts

유튜브 https://www.youtube.com/watch?v=MfDZ1BrmnKM

encapsulation: ViewEncapsulation.Emulated : 기본값, 내 컴포넌트에서 만든 css는 내 컴포넌트에만 사용하겠다.
encapsulation: ViewEncapsulation.Native : 내 컴포넌트에서 만든 css를 제외한 모든 css를 받지 않겠다.
encapsulation: ViewEncapsulation.None : 내 컴포넌트에서 만든 css를 어디에서나 (자식 컴포넌트) 사용할 수 있게 하겠다.