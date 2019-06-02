---
layout: post
title:  "Softkeyboard on EditText"
date:   2016-08-30 08:42:32 +0530
categories: Android
summary: Here is a workaround for android softkeyboard hiding the Edittext in focus

---

I have been facing this problem for a while, where the android softkeyboard hides the `EditText` on which we are typing. This happens when `android:windowSoftInputMode="adjustPan"` is set to the activity in `AndroidManifest.xml`. This flag `adjustPan` means that whenever the keyboard is visible, the views in the page should adjust itself by panning upwards so that the `EditText` in focus lies exactly above the keyboard. But the problem is that the adjust pan work for the first time and when `EditText` is focused the second time, keyboard hides the `EditText` if it lower in the screen less than the height of the keyboard. 

The cause of the above problem is that the `EditText` focus is not cleared when the keyboard hides for the first time. The keyboard is hidden by either clicking the back button or but by clicking the EditorAction button in keyboard. So the below workaround will help you in fixing this problem

First let me put the entire extended `EditText` code and we will dig into the code later

{% highlight java %}
public class CustomEditText extends EditText {
  public CustomEditText(Context context, AttributeSet attrs, int defStyle) {
    super(context, attrs, defStyle);
    init(attrs);
  }

  public CustomEditText(Context context, AttributeSet attrs) {
    super(context, attrs);
    init(attrs);
  }

  public CustomEditText(Context context) {
    super(context);
    init(null);
  }

  private void init(AttributeSet attrs) {
  	//you can add you code here to make use of the attrs

    handleActionBtnClick();
  }

  private void handleActionBtnClick() {
    setOnEditorActionListener(new OnEditorActionListener() {
      @Override public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
        ((InputMethodManager) v.getContext()
            .getSystemService(Context.INPUT_METHOD_SERVICE)).hideSoftInputFromWindow(
            v.getWindowToken(), 0);
        clearFocus();
        return false;
      }
    });
  }

  @Override public boolean onKeyPreIme(int keyCode, KeyEvent event) {
    if (keyCode == KeyEvent.KEYCODE_BACK) {
      clearFocus();
    }
    return super.onKeyPreIme(keyCode, event);
  }
}
{% endhighlight %}  

So now what have we done in `handleBtnClick()`
Here a listener is added to listen EdittorAction button click in softkeyboard, in which hiding the keyboard and clearing the focus on current `EditText`. So now if the user hides the keyboard by pressing EditorAction button, and focuses the `EditText` again it will pan perfectly and `EditText` will show above the keyboard

Next thing to solve is backbutton press. So to do that we are listening for keypress by overriding `onKeyPreIme()` which is called when back button is pressed with keyboard showing. When `onKeyPreIme()` is pressed we do a check for back button code `KeyEvent.KEYCODE_BACK` and clear the focus on the `EditText`


