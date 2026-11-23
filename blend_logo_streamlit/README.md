# Blend Logo Loader for Streamlit

Creator: <dinesh_blend360_india> <dinesh.marre@blend360.com>

Copy this whole folder into your Streamlit app next to app.py. Streamlit must already be installed in that app.

~~~python
from blend_logo_streamlit import show_blend_logo

show_blend_logo(height=220)
~~~

The logo runs inside a transparent iframe and loops while the iframe is visible. The helper uses st.iframe on current Streamlit versions and falls back to streamlit.components.v1.html on older versions. Keep index.html beside __init__.py because the helper loads that file.

Official API references: https://docs.streamlit.io/develop/api-reference/text/st.iframe and https://docs.streamlit.io/develop/api-reference/custom-components/st.components.v1.html
