# Application logic

## "Senti Watchman" - (Client Update App structure)
- Description: Senti Watchman is a sentinel that monitors the senti-mqtt-client and update/restart the client when needed
- PATH: /srv/nodejs/senti/senti-watchman
- init 
	- Get options/env/version from API
	- Check for updates - get version (self) -> do update self
- Connect
- Run
	- First run: Initial check for client updates -> do update client
	- On MQTT receive update - check version -> do update client - set client update flag
	- Restart systemd "senti-mqtt-client" service

```sh

sudo systemctl start senti-watchman.service
sudo systemctl restart senti-watchman.service
systemctl status senti-watchman.service
curl http://localhost:3000/
sudo systemctl stop senti-watchman.service
journalctl -f -u senti-watchman.service
systemctl daemon-reload

```
