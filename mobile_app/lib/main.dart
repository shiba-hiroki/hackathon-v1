import 'package:flutter/material.dart';
import 'package:mobile_app/screens/login_screen.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(child: LoginScreen()),
      ),
    );
  }
}

