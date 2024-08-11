import { useState, useEffect } from 'react';
import { fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

type ThemeT = 'dark' | 'light';

const useTheme = (): ThemeT => {
  const [theme, setTheme] = useState<ThemeT>('light');

  function getTheme():ThemeT{
    const className = document.body.className;

    const theme = Boolean(className) ? 'dark' : 'light';

    return theme
  }

  useEffect(() => {
    setTheme(getTheme());
    
    const subscription: Subscription = fromEvent(document.body, 'classNameChange')
      .pipe(
        map(() => (getTheme()))
      )
      .subscribe(setTheme);

    return () => subscription.unsubscribe();
  }, []);

//   useEffect(()=>{
//     console.log(theme)
//   },[theme])

  return theme;
};

export default useTheme;
