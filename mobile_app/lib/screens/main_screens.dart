import 'package:flutter/material.dart';
import 'package:mobile_app/screens/attendance_screen.dart';
import 'package:mobile_app/screens/shift_request_screen.dart';
import 'package:mobile_app/screens/confirmedShift_screen.dart';

class MainScreen extends StatefulWidget {
  final String userID;
  final String sessionID;
  const MainScreen({required this.userID, required this.sessionID, super.key});

  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;
  late final String _sessionID;
  late final String _userID;
  late final List<Widget> _pageWidgets;

  @override
  void initState() {
    super.initState();
    _sessionID = widget.sessionID;
    _userID = widget.userID;
    _pageWidgets = [
      AttendanceScreen(sessionID: _sessionID, userID: _userID),
      ConfirmedShiftScreen(sessionID: _sessionID, userID: _userID),
      ShiftRequestScreen(sessionID: _sessionID, userID: _userID),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('磁気らくら君'),
        centerTitle: true,
      ),
      body: _pageWidgets.elementAt(_currentIndex),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(icon: Icon(Icons.list), label: '出退勤記録'),
          BottomNavigationBarItem(icon: Icon(Icons.list), label: '確定済みシフト'),
          BottomNavigationBarItem(icon: Icon(Icons.create), label: '提出'),
        ],
        currentIndex: _currentIndex,
        fixedColor: Colors.blueAccent,
        onTap: _onItemTapped,
        type: BottomNavigationBarType.fixed,
      ),
    );
  }

  void _onItemTapped(int index) => setState(() => _currentIndex = index);
}
