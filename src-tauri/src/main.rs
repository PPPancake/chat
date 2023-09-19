// 在发布模式下,通过设置 Windows 子系统为 "windows" 来禁用控制台窗口，以获得更类似传统 Windows GUI 应用程序的用户体验。
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod commands;
mod setup;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![ // 响应前端事件和调用的处理程序
          commands::system::read_config,
          commands::system::write_config,
          commands::session::read_state,
          commands::session::write_state,
          commands::session::read_session,
          commands::session::write_session,
          commands::session::delete_session,
        ])
        .setup(setup::init) //执行初始化任务
        .run(tauri::generate_context!()) //配置程序的上下文并启动程序
        .expect("error while running tauri application"); //错误处理
}
