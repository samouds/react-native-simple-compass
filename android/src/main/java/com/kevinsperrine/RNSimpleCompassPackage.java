
package com.kevinsperrine;

import androidx.annotation.NonNull;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

public class RNSimpleCompassPackage implements ReactPackage {
  @Override
  @NonNull
  public List<NativeModule> createNativeModules(
      @NonNull ReactApplicationContext reactContext) {
    return Arrays.<NativeModule>asList(new RNSimpleCompassModule(reactContext));
  }

  @Override
  @NonNull
  public List<ViewManager> createViewManagers(
      @NonNull ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}
