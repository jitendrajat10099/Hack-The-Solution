# Hack The Solution 

Hack the other's Solutions or Find logical errors and bugs by generating the platform independent set of random testcases

## How it works
* Extension takes two source files(**correct solution** and **wrong solution**)
* Random inputs are generated using **generator file**.
* Both source files run on these inputs
* Output is compared using **checker** 
* Read more about **generators** [here](https://codeforces.com/blog/entry/18291)

## Features

* Support all default checkers of Codeforces
* supported languages : C, C++, Java, Python

## Requirements

* C++ must be installed on system and accessible globally.

## How to start
1. open any workspace
2. open **Command Palette(```Ctrl + Shift + P```)**
3. search for **`HTS : Start the Hack`** or **(`Ctrl + Alt + H`)**
    
    ![command palette](https://github.com/jitendrajat10099/Hack-The-Solution/raw/main/screenshot/command_palette.png)
4. Give relative path from workspace to source files 
   
    ![taking input](https://github.com/jitendrajat10099/Hack-The-Solution/raw/main/screenshot/input.gif)

5. Here you go. Hack started
6. Random testcases will be generated automatically until bug not found or maximum number of testcases reached.

   
## Extension Settings

**1. Max Tests :**  Maximum number of testcases to run. Default 50

**2. Time Out :** TimeLimit for a souce code to run in millisecond. Default 2000




