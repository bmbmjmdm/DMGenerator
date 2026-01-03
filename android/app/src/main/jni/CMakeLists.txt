cmake_minimum_required(VERSION 3.13)
project(appmodules)

# Ensure the generated shared objects request 16 KB page alignment on Android 15+
add_link_options(-Wl,-z,common-page-size=4096 -Wl,-z,max-page-size=16384)

include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)
