import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile_app/screens/main_screens.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String _userID = '';
  String _password = '';
  String _sessionID = '';
  bool hidePassword = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'Login',
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
              TextFormField(
                decoration: const InputDecoration(
                  icon: Icon(Icons.account_circle),
                  hintText: 'Enter your username',
                  labelText: 'Username',
                ),
                onChanged: (String value) {
                  setState(() {
                    _userID = value;
                  });
                },
              ),
              TextFormField(
                obscureText: hidePassword,
                decoration: InputDecoration(
                  icon: const Icon(Icons.lock),
                  hintText: 'Enter your password',
                  labelText: 'Password',
                  suffixIcon: IconButton(
                    icon: Icon(
                      hidePassword ? Icons.visibility_off : Icons.visibility,
                    ),
                    onPressed: () {
                      setState(() {
                        hidePassword = !hidePassword;
                      });
                    },
                  ),
                ),
                onChanged: (String value) {
                  setState(() {
                    _password = value;
                  });
                },
              ),
              const SizedBox(height: 15),
              ElevatedButton(
                onPressed: () async {
                  _sessionID = await onClicked();
                  print(_sessionID);
                  Navigator.of(context).pushReplacement(MaterialPageRoute(
                      builder: (context) => MainScreen(
                            userID: _userID,
                            sessionID: _sessionID,
                          )));
                },
                child: const Text('Login'),
              )
            ],
          ),
        ),
      ),
    );
  }

  Future<String> onClicked() async {
    final uri =
        Uri.https('backend.koki20001206.workers.dev', '/api/login/employee');

    final http.Response res = await http.post(uri,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({'name': _userID, 'password': _password}));

    if (res.statusCode == 201) {
      final dynamic body = jsonDecode(res.body);
      return body['sessionID'] as String;
    } else {
      throw Exception('Failed to login');
    }
  }
}

